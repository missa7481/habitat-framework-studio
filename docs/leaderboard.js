(() => {
  'use strict';

  const metrics = {
    nll: {short: 'Log loss', title: 'Negative log likelihood', preference: 'lower', sign: -1},
    auc: {short: 'Ranking area', title: 'Area under the receiver operating characteristic curve', preference: 'higher', sign: 1},
    ece: {short: 'Calibration error', title: 'Expected calibration error', preference: 'lower', sign: -1}
  };
  const value = x => Number.isFinite(x) ? x.toFixed(4) : '—';
  const pct = x => Number.isFinite(x) ? Math.abs(x).toFixed(2) + '%' : '—';
  const delta = (r, b, key) => metrics[key].sign * (r[key] - b[key]);
  const gain = (r, b, key) => b && Number.isFinite(b[key]) && b[key] !== 0
    ? 100 * delta(r, b, key) / Math.abs(b[key]) : NaN;
  const signed = (x, precision = 2) => Number.isFinite(x)
    ? (Math.abs(x) < 0.5 / 10 ** precision ? (0).toFixed(precision) : (x > 0 ? '+' : '−') + Math.abs(x).toFixed(precision)) : '—';
  const order = (rows, key) => [...rows].filter(r => Number.isFinite(r[key]))
    .sort((a, b) => metrics[key].sign * (b[key] - a[key]) || a.arm.localeCompare(b.arm));
  const count = x => Number(x).toLocaleString('en-US');
  const find = (scope, arm) => scope.rows.find(r => r.arm === arm);

  function modelDescription(arm, evidence) {
    if (arm === evidence.matched) return 'A random forest combines 105 local environmental and satellite features with 12 historical mosquito-report features, using one prediction stage.';
    if (arm === evidence.plain) return 'A random forest combines local climate, landscape and human variables with a frozen satellite embedding.';
    if (arm.startsWith('HF2')) {
      const history = arm.includes('pool4') ? 'the 12 historical mosquito-report features' : 'regional information';
      const novelty = arm.includes('shrink2') ? 'a region is unfamiliar in either its environment or its reporting history'
        : arm.includes('shrinkP') ? 'a region has an unfamiliar reporting history' : 'a region has an unfamiliar environment';
      return 'A local random forest combines climate, landscape, human variables and AlphaEarth satellite features. A regional model uses ' +
        history + ' to adjust local scores while keeping local and regional relative odds consistent.' +
        (arm.includes('shrink') ? ' The regional adjustment weakens when ' + novelty + ' relative to the training regions.' : '');
    }
    return 'The comparison scores observed species composition on held-out test regions. The full configuration identifier is in the results table.';
  }

  function definitions() {
    return '<details class="metric-guide"><summary>How to read the three metrics and percentage gains</summary><dl>' +
      '<div><dt>Negative log likelihood (NLL)</dt><dd>Average negative natural logarithm of the probability assigned to the reported category. Loss is weighted by report counts within each split. A lower value means the model assigned more probability to the categories people actually reported.</dd></div>' +
      '<div><dt>Area under the receiver operating characteristic curve (AUC)</dt><dd>For one of four target categories, this is the probability that a cell with a report ranks above a cell without one, with half credit for ties. The score averages eligible categories. Higher is better.</dd></div>' +
      '<div><dt>Expected calibration error (ECE)</dt><dd>Predicted shares are grouped into ten bins. The score averages the report-weighted absolute gap between predicted and observed shares across four target categories. Lower is better.</dd></div>' +
      '<div><dt>Gain over the selected reference</dt><dd>For loss or calibration error, relative gain is 100 × (reference − model) / reference. For ranking area the subtraction is reversed. A positive value favors the model. A decrease in loss from 1.00 to 0.98 gives a 2% gain.</dd></div></dl></details>';
  }

  function archiveSection(data, esc) {
    const archive = data.registry || [];
    const total = type => archive.reduce((n, r) => n + (Number(r[type]) || 0), 0);
    const rows = archive.map(r => '<tr><th scope="row"><a href="#experiments/' + encodeURIComponent(r.id) + '">' +
      esc(r.title) + '</a></th><td>' + esc(r.winner) + '</td><td>' + esc(r.baseline) + '</td><td>' + esc(r.metric) + '</td><td>' + value(r.score) +
      '</td><td>' + signed(r.gain) + '%</td><td>' + [[r.refitted,'refitted'],[r.evaluated,'frozen models evaluated'],[r.rescored,'stored predictions rescored']].filter(([n])=>n>0).map(([n,word])=>n+' '+word).join(', ') + '</td></tr>').join('');
    return '<section class="section overview-audit"><div class="section-head"><div><p class="kicker">Research archive</p><h2>What the other experiments measure</h2></div><a class="link" href="#experiments">Browse experiment records</a></div>' +
      '<article class="overview-macro"><div><h3>Broad-area species reporting</h3><p>Across 113 broad tiles, fixed fusion combined climate, satellite features adjusted for climate, a geographic term and a beta-binomial model. It reduced average loss against logistic regression using the same input families.</p></div>' +
      '<div><strong>6.51%</strong><span>Primary partition</span></div><div><strong>8.76%</strong><span>Shifted partition</span></div></article>' +
      '<p class="board-note">The two partitions reuse observations. The fixed recipe was identified after inspecting results. A separate selection procedure, fitted inside the training folds, won three of six primary sectors with one tie. Its promotion rule required four strict wins. <a href="#ablations">Compare the paired changes</a>.</p>' +
      '<details class="archive-details"><summary>See the other eight study and partition results</summary>' +
      '<p>Across these eight comparisons, '+count(total('refitted'))+' configuration results came from fresh fits. '+(total('evaluated') ? 'Another '+count(total('evaluated'))+' came from evaluating previously fitted models. ' : '')+(total('rescored') ? 'For '+count(total('rescored'))+' results, we rescored saved predictions. ' : '')+'Each row uses its own observation target and reference model.</p>' +
      '<div class="board-scroll" role="region" tabindex="0" aria-label="Other study results"><table class="leader-table audit-table"><thead><tr><th scope="col">Experiment</th><th scope="col">Within-study leader</th><th scope="col">Reference model</th><th scope="col">Measure</th><th scope="col">Score</th><th scope="col">Gain</th><th scope="col">Evaluation repeated</th></tr></thead><tbody>' + rows +
      '</tbody></table></div></details></section>';
  }

  function csvExport(scopes, referenceId, save) {
    const header = ['scope','folds','configuration','label','source','reference','mean_log_loss','mean_ranking_auc','mean_calibration_error','loss_gain_percent','ranking_gain_percent','calibration_gain_percent','fold_loss_wins_vs_plain','fold_loss_wins_vs_matched'];
    const rows = scopes.flatMap(scope => {
      const base = find(scope, referenceId);
      return order(scope.rows, 'nll').map(r => [scope.label,scope.folds,r.arm,r.label,r.source,referenceId,r.nll,r.auc,r.ece,
        ...Object.keys(metrics).map(k => {const x = gain(r,base,k); return Number.isFinite(x) ? x : '';}),
        r.winsPlain,r.winsMatched]);
    });
    const quote = x => '"' + String(x ?? '').replaceAll('"','""') + '"';
    save('habitat-composition-aggregate.csv',[header,...rows].map(r => r.map(quote).join(',')).join('\r\n'),'text/csv;charset=utf-8');
  }

  // The public asset supplies aggregate comparisons only. The page also works from a local file.
  window.renderFrameworkOverview = function(container,data,{esc,opts,csvSave}) {
    if (!data?.scopes?.length) {
      container.innerHTML = '<section class="panel"><h1>Benchmark overview</h1><p>The aggregate results file could not be loaded. Open the research workspace with its complete set of website files.</p><a class="link" href="#experiments">View archived experiments</a></section>';
      return;
    }
    const all = data.scopes.find(s => s.id === 'all') || data.scopes[0];
    const best = order(all.rows,'nll')[0];
    const plain = find(all,data.plain);
    const matched = find(all,data.matched);
    const released = find(all,data.released);
    const inputLink = '<a href="#protocol/data">Review data sources</a>';
    function comparison(ref, label) {
      if (!ref) return '';
      return '<div><strong>' + pct(gain(best,ref,'nll')) + '</strong><span>lower loss vs. ' + label + '</span></div>';
    }
    const releaseRank = order(all.rows,'nll').findIndex(r=>r.arm===data.released) + 1;
    const winnerName=esc(best.label || best.arm);
    const winningRecipe=best.arm==='HF2-shrink+pool4'
      ? ' The seventh research iteration combined a local random forest with historical observations and weakened the regional correction in unfamiliar environments.' : '';
    const sc = data.scopes.map(s=>[s.id,s.label]);
    container.innerHTML = '<section class="hero results-hero"><div class="hero-copy"><p class="kicker">Global mosquito habitat research</p><h1>'+winnerName+'</h1><p class="hero-finding">Lowest average log loss across '+all.folds+
      ' held-out splits for the species composition of community reports.'+winningRecipe+'</p><div class="hero-contrasts">'+comparison(plain,'the plain forest')+comparison(matched,'the source-matched forest')+
      '</div><div class="actions"><button class="btn light" id="show-board">Compare all configurations</button><a class="btn ghost" href="#designer">Open model designer</a></div></div><figure class="hero-geo"><img src="assets/input-globe.png" alt="Globe showing the archived coverage of environmental inputs around the Atlantic, Europe and Africa."><figcaption><a href="#coverage">2024 environmental input coverage</a></figcaption></figure></section>'+
      '<div class="metrics">'+[['17,232','mosquito reports, 2022–2025'],['7,004','observed grid cells'],['117','source variables in the matched comparison'],[all.folds,'held-out evaluation splits']].map(([n,l])=>'<div class="metric"><strong>'+n+'</strong><span>'+l+'</span></div>').join('')+'</div>'+
      '<section class="section board-section" id="composition-ranking" tabindex="-1"><div class="section-head"><div><p class="kicker">Five-category composition</p><h2>Model comparison</h2></div><button class="btn plain" id="download-board">Download aggregate CSV</button></div>'+
      '<div class="board-toolbar"><label>Evaluation scope<select id="board-scope">'+opts(sc,all.id)+'</select></label><label>Rank by<select id="board-metric">'+opts(Object.entries(metrics).map(([k,m])=>[k,m.short+' · '+m.preference+' is better']),'nll')+
      '</select></label><label>Comparison reference<select id="board-reference">'+opts([[data.matched,'Source-matched random forest'],[data.plain,'Plain random forest']],data.matched)+'</select></label></div>'+
      '<div id="board-summary" class="board-summary" aria-live="polite"></div><div id="board-rows"></div>'+definitions()+'</section>'+
      '<section class="section overview-architecture"><div class="section-head"><div><p class="kicker">The winning combination</p><h2>What entered the model</h2></div>'+inputLink+'</div>'+
      '<div class="overview-columns"><article><h3>Local environment</h3><p>26 climate, 11 landscape and 4 human variables join 64 AlphaEarth satellite embedding values. Together they describe the local environment in 105 features.</p></article>'+
      '<article><h3>Historical mosquito reports</h3><p>Four regional features summarize the Kraemer <i>Aedes</i> occurrence compendium. Eight more summarize mosquito records through 2021 from the Global Biodiversity Information Facility (GBIF). The source-matched forest receives these 12 features and all 105 local features.</p></article>'+
      '<article><h3>Representation and spatial model</h3><p>'+esc(modelDescription(best.arm,data))+'</p></article></div>'+
      '<p class="board-note">The outcome is the mix of five mosquito categories in research-grade iNaturalist reports from 2022–2025. Environmental predictors use 2024 as their reference year. Reported composition depends on both ecology and who reported what. Estimating habitat occupancy requires independent observations with documented survey effort.</p></section>'+
      '<section class="section"><div class="section-head"><div><p class="kicker">Interpretation</p><h2>What changes with the test?</h2></div><a href="#coverage/performance" class="link">Explore the sector map</a></div>'+
      '<div class="overview-columns" id="board-insights"></div><p class="board-note" id="board-method"></p>'+
      '<details class="metric-guide"><summary>Study design and reproducibility</summary><p>The same observed cells are repartitioned into four previously examined evaluation designs. The headline assigns equal weight to each held-out split, so designs with more splits contribute more. The within-design comparisons show how a result changes with geography or climate.</p><p>Some environmental preprocessing used the global feature distribution without labels. The source-matched forest receives the same 117 source variables. The hierarchy also aggregates local and regional context, and computation budgets differ. These comparisons describe the tested pipelines on reused observations.</p>'+
      '<p>The project calls its cycle of evaluation, error analysis and model revision RSI. The seventh iteration produced HiCo-Fuse 2. The component comparison above measures what changed when environmental shrinkage was enabled. A separate experiment would be needed to estimate the gain attributable to the research process itself. <a href="https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/rsi/memory/RESEARCH_MEMORY.md" target="_blank" rel="noopener">Read the research log</a>.</p>'+
      '<p id="board-sensitivity"></p><p id="board-audit"></p></details></section>'+archiveSection(data,esc);
    const get=id=>container.querySelector('#'+id);
    if (all.omitOneDesign?.length) {
      const sensitivity=[...all.omitOneDesign].sort((a,b)=>a.relativeGain-b.relativeGain);
      const low=sensitivity[0], high=sensitivity.at(-1);
      get('board-sensitivity').textContent='How much does the choice of tests matter? Holding the headline model fixed and dropping one evaluation design at a time changes its loss advantage over the source-matched forest from '+signed(low.relativeGain)+'% (omitting '+low.omitted.toLowerCase()+') to '+signed(high.relativeGain)+'% (omitting '+high.omitted.toLowerCase()+'). This range measures sensitivity to the mix of tests.';
    }
    get('show-board').onclick=()=>{get('composition-ranking').focus({preventScroll:true});get('composition-ranking').scrollIntoView({block:'start'});};
    get('download-board').onclick=()=>csvExport(data.scopes,get('board-reference').value,csvSave);
    const releaseLabel=esc(released?.label || data.released);
    const calibration=order(all.rows,'ece')[0];
    const ranking=order(all.rows,'auc')[0];
    const region=data.scopes.find(s=>s.id==='loro');
    const regionWinner=region && order(region.rows,'nll')[0];
    const regionOverallLeader=region && find(region,best.arm);
    const regionReference=region && find(region,data.matched);
    const regionalGain=regionOverallLeader && regionReference ? gain(regionOverallLeader,regionReference,'nll') : NaN;
    const regionalComparison=Number.isFinite(regionalGain) ? ' Here the overall loss leader scored '+value(regionOverallLeader.nll)+', '+pct(regionalGain)+' '+(regionalGain>=0?'lower':'higher')+' than the source-matched forest ('+value(regionReference.nll)+').' : '';
    get('board-insights').innerHTML='<article><h3>Released version</h3><p>' + releaseLabel + (released ? ' ranked '+releaseRank+' of '+all.rows.length+' by mean loss ('+value(released.nll)+'). Its adjustment uses novelty in both the environment and historical records.' : ' has no score for this scope.')+
      '</p></article><article><h3>Ranking and calibration</h3><p>'+esc(ranking.label)+' led on ranking area ('+value(ranking.auc)+'). '+esc(calibration.label)+' had the smallest mean calibration error ('+value(calibration.ece)+').'+
      '</p></article><article><h3>Held-out regions</h3><p>'+(regionWinner ? esc(regionWinner.label)+' led in '+esc(region.label)+' with loss '+value(regionWinner.nll)+'.'+regionalComparison : 'Each geographic scope has its own ranking in the selector above.')+'</p></article>';
    const noShrink=find(all,'HF2+pool4');
    const environmentalShrink=find(all,'HF2-shrink+pool4');
    if (noShrink && environmentalShrink) {
      get('board-method').innerHTML='<strong>What did environmental shrinkage add?</strong> With the same regional history and hierarchy, weakening the adjustment when the local environment differed from training regions changed average loss from '+value(noShrink.nll)+' to '+value(environmentalShrink.nll)+' ('+pct(gain(environmentalShrink,noShrink,'nll'))+' '+(environmentalShrink.nll<noShrink.nll?'lower':'higher')+'). Both configurations were evaluated on the same '+all.folds+' splits.';
    }
    get('board-audit').textContent = [data.audit?.nativeHiCo ? 'The HiCo replay refitted '+count(data.audit.nativeHiCo)+' archived presets across '+all.folds+' splits each.' : '',
      data.audit?.fixedIterationTables?.length ? 'Earlier research iterations contributed '+count(data.audit.fixedIterationTables.reduce((a,t)=>a+t.aggregateRows,0))+' refitted configuration-by-split comparisons to the ranking.' : '',
      data.audit?.nestedDevelopmentFits ? 'The separate 2024 suitability-ranking benchmark repeated '+count(data.audit.nestedDevelopmentFits)+' inner and outer training fits. The 2025 US survey diagnostic reapplied '+count(data.audit.frozenExternalModels)+' frozen models to previously reviewed labels.' : '',
      data.audit?.broadAreaOuterFits ? 'All '+count(data.audit.broadAreaOuterFits)+' outer R and Java fits completed in the broad-area study. Of '+count(data.audit.broadAreaInnerAttempts)+' inner fits, '+count(data.audit.broadAreaInnerFits)+' completed. The same six flexible-discriminant fits failed in the original run.' : '',
      data.audit?.historicalScores ? 'A separate archive check rescored '+count(data.audit.historicalScores)+' historical fold metrics.' : ''].filter(Boolean).join(' ');
    function refresh() {
      const scope=data.scopes.find(s=>s.id===get('board-scope').value);
      const key=get('board-metric').value;
      const reference=find(scope,get('board-reference').value);
      const ranked=order(scope.rows,key);
      const leader=ranked[0];
      const isMatched=reference?.arm===data.matched;
      const gains=reference ? (leader.arm===reference.arm ? ' The selected comparison reference leads on this metric.' : ' The leader’s relative gain against '+esc(reference.label)+' is '+signed(gain(leader,reference,key))+'%.') : '';
      const winsText=key==='nll' && (isMatched ? leader.winsMatched : leader.winsPlain);
      const winSummary=key==='nll' && leader.arm!==reference?.arm && Number.isFinite(winsText) ? ' Its loss was lower in '+winsText+' of '+scope.folds+' paired splits.' : '';
      const balanced=scope.designBalanced;
      get('board-summary').innerHTML='<p><strong>'+esc(leader.label)+'</strong> ranks first by '+esc(metrics[key].short.toLowerCase())+
        ' ('+value(leader[key])+') among '+ranked.length+' configurations with results on all '+scope.folds+' splits in this scope.'+gains+winSummary+'</p>'+
        (balanced ? '<p>Giving the four designs equal weight puts <strong>'+esc(balanced.label)+'</strong> first by mean loss ('+value(balanced.nll)+').</p>' : '');
      let rank=0, rankValue=null;
      const body=ranked.map((r,i)=>{
        if (rankValue===null || Math.abs(r[key]-rankValue)>1e-12) {rank=i+1;rankValue=r[key];}
        const tags=[r.arm===data.released && 'Released',r.arm===reference?.arm && 'Reference'].filter(Boolean);
        const metricValues=Object.keys(metrics).map(k=>'<td'+(k===key?' class="rank-column"':'')+'>'+value(r[k])+'</td>').join('');
        const relative=reference ? gain(r,reference,key) : NaN;
        const wins=isMatched ? r.winsMatched : r.winsPlain;
        return '<tr'+(r.arm===data.released?' class="released-row"':'')+'><td>'+String(rank)+'</td><th scope="row">'+esc(r.label)+
          (tags.length ? '<small>'+tags.join(' · ')+'</small>':'')+'</th>'+metricValues+'<td>'+signed(relative)+'%</td><td>'+(Number.isFinite(wins)?wins+' / '+scope.folds:'—')+'</td></tr>';
      }).join('');
      const heads=Object.entries(metrics).map(([k,m])=>'<th scope="col"'+(k===key?' aria-sort="'+(m.sign>0?'descending':'ascending')+'"':'')+'>'+m.short+'</th>').join('');
      get('board-rows').innerHTML='<div class="board-scroll" tabindex="0" role="region" aria-label="Complete model ranking"><table class="leader-table"><thead><tr><th scope="col">Rank</th><th scope="col">Configuration</th>'+
        heads+'<th scope="col">Gain in selected metric</th><th scope="col">Splits with lower loss than reference</th></tr></thead><tbody>'+body+'</tbody></table></div><p class="board-foot">Scores are displayed to four decimals. Rankings use unrounded split means and share a rank for numerical ties within 10⁻¹². Some registered configurations repeat a baseline. Percentage gains apply to the selected metric and scope.</p>';
    }
    ['board-scope','board-metric','board-reference'].forEach(id=>get(id).onchange=refresh);
    refresh();
  };
})();
