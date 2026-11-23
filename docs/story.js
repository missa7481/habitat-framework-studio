/* Guided reading of the frozen, aggregate report-composition experiment. */
(() => {
  'use strict';
  const chapters = [
    {id:'observations', tab:'Observations', title:'What did observers record?', link:'#live', action:'Explore input coverage'},
    {id:'architecture', tab:'Model', title:'How does a region change a local prediction?', link:'#designer', action:'Open the model designer'},
    {id:'comparison', tab:'Benchmark', title:'How much does the hierarchy add?', link:'#overview', action:'Compare all configurations'},
    {id:'transfer', tab:'Transfer', title:'Does the advantage travel?', link:'#experiments/hico-loro/hico-fuse-2', action:'Inspect the regional holdout'}
  ];
  const arm = 'HF2-shrink+pool4';
  const reduction = (model, reference) => 100 * (1 - model.nll / reference.nll);
  const row = (scope,id) => scope.rows.find(r => r.arm === id);
  const score = n => n.toFixed(4);
  const percent = n => Math.abs(n).toFixed(2) + '%';
  const chapterURL = chapter => '#story/' + chapter.id;

  function observations() {
    const inputs = [['Climate',26,'climate'],['Landscape',11,'land'],['Human activity',4,'human'],['Earth embedding',64,'earth']];
    const bars = inputs.map(([name,n,style]) =>
      '<li><span>'+name+'</span><span class="hs-bar-track"><i class="hs-fill-'+style+'" style="width:'+(n/64*100)+'%"></i></span><strong>'+n+'</strong></li>').join('');
    return {
      paragraphs:[
        'Researchers grouped 17,232 research-grade iNaturalist mosquito reports from 2022–2025 into 7,004 observed grid cells. Each cell contributes counts for five mosquito categories.',
        'The model estimates the mix of categories among submitted reports. Survey effort and observer behavior affect that mix. Measuring habitat occupancy would require independent observations with documented effort.'
      ],
      exhibit:'<figure class="hs-figure"><figcaption><h2>What describes an observed cell?</h2><p>Local predictors with a 2024 environmental reference</p></figcaption>'+
        '<div class="hs-total"><strong>105</strong><span>local features</span></div><ul class="hs-bars">'+bars+'</ul>'+
        '<p class="hs-caption">The 64 AlphaEarth embedding values summarize satellite observations. The other 41 variables describe named environmental and human conditions.</p></figure>'
    };
  }

  function architecture() {
    return {
      paragraphs:[
        'HiCo-Fuse 2 starts with a random forest fit to the local environment. A regional model then uses historical mosquito records to adjust the relative odds of the five report categories.',
        'The lowest-loss variant weakens that adjustment where the environment is unfamiliar. The previously released version also weakens it when the regional reporting history is unfamiliar.'
      ],
      exhibit:'<figure class="hs-figure"><figcaption><h2>How the two scales connect</h2><p>HiCo-Fuse 2 with environmental shrinkage</p></figcaption>'+
        '<div class="hs-flow"><div class="hs-flow-input"><small>Local inputs</small><strong>105 features</strong><span>Environment, human activity and satellite embedding</span></div>'+
        '<div class="hs-flow-input"><small>Regional inputs</small><strong>12 historical features</strong><span>4 Kraemer occurrence summaries and 8 Global Biodiversity Information Facility summaries</span></div>'+
        '<div class="hs-branch"><strong>Local random forest</strong><span>Initial report-category scores</span></div>'+
        '<div class="hs-branch"><strong>Regional adjustment</strong><span>Less weight in unfamiliar environments</span></div>'+
        '<div class="hs-merge"><strong>Five-category composition</strong><span>Local scores adjusted to agree with the regional relative odds</span></div></div>'+
        '<p class="hs-caption">The comparison forest receives the same 117 source variables in a single stage.</p></figure>'
    };
  }

  function comparison(evidence, all) {
    const candidate = row(all,arm), plain = row(all,evidence.plain), matched = row(all,evidence.matched);
    const rows = [[candidate,'Environmental shrinkage'],[row(all,'HF2+pool4'),'Hierarchy without shrinkage'],[row(all,evidence.released),'Released dual shrinkage'],[matched,'Forest with historical inputs'],[plain,'Forest with local inputs']].sort((a,b)=>a[0].nll-b[0].nll);
    return {
      paragraphs:[
        'Across '+all.folds+' held-out splits, environmental shrinkage had the lowest mean log loss among '+all.rows.length+' complete configurations. Log loss rewards a model for assigning more probability to the category that was reported.',
        'The loss advantage was '+percent(reduction(candidate,plain))+' against the local forest. It narrowed to '+percent(reduction(candidate,matched))+' when the forest also received the 12 historical features. Each split carries equal weight in these means.'
      ],
      exhibit:'<figure class="hs-figure"><figcaption><h2>Same splits, different combinations</h2><p>Mean log loss per report · lower is better</p></figcaption>'+
        '<table class="hs-loss-table"><thead><tr><th scope="col">Configuration</th><th scope="col">Log loss</th></tr></thead><tbody>'+rows.map(([r,label])=>
          '<tr'+(r.arm===arm?' class="hs-emphasis"':'')+'><th scope="row">'+label+'</th><td>'+score(r.nll)+'</td></tr>').join('')+
        '</tbody></table><p class="hs-caption">Five selected rows from the full comparison. The source-matched forest led on area under the receiver operating characteristic curve, a measure of ranking ability ('+score(matched.auc)+').</p></figure>'
    };
  }

  function transfer(evidence, all) {
    const candidate = row(all,arm);
    const names={block10:'Spatial blocks',env:'Environment clusters',zone:'Climate zones',loro:'Entire regions'};
    const values=['block10','env','zone','loro'].map(id=>{
      const scope=evidence.scopes.find(s=>s.id===id);
      return [names[id],scope.folds,reduction(row(scope,arm),row(scope,evidence.matched))];
    });
    const extent=Math.ceil(Math.max(...values.map(v=>Math.abs(v[2]))));
    const chart=values.map(([name,folds,gain])=>'<li><span>'+name+'<small>'+folds+' splits</small></span><span class="hs-diverge" aria-hidden="true"><i class="'+(gain>=0?'hs-lower':'hs-higher')+'" style="width:'+(50*Math.abs(gain)/extent)+'%"></i></span><b>'+percent(gain)+' '+(gain>=0?'lower':'higher')+'</b></li>').join('');
    const region = values[3][2];
    return {
      paragraphs:[
        'The candidate had lower loss than the source-matched forest on '+candidate.winsMatched+' of '+all.folds+' individual splits. Averaged within each design, it led on three of the four ways of holding out observations.',
        'Holding out entire regions reversed the result. The candidate’s loss was '+percent(region)+' higher than the forest’s. An independent regional survey would test whether this architecture improves habitat estimates beyond the locations used to develop it.'
      ],
      exhibit:'<figure class="hs-figure"><figcaption><h2>Where the loss changes</h2><p>Environmental shrinkage compared with the source-matched forest</p></figcaption>'+
        '<ul class="hs-transfer">'+chart+'</ul><div class="hs-gain-key"><span><i class="hs-lower"></i>Lower candidate loss</span><span><i class="hs-higher"></i>Higher candidate loss</span></div>'+
        '<p class="hs-caption">The center of each bar is zero change. Percentages use the forest loss for that design as the denominator. The four designs reuse observations.</p></figure>'
    };
  }

  window.renderHabitatStory = (container, chapter) => {
    const index=Math.max(0,chapters.findIndex(c=>c.id===chapter));
    const current=chapters[index], evidence=window.OVERVIEW_RESULTS;
    const output=[observations,architecture,comparison,transfer][index](evidence,evidence.scopes.find(s=>s.id==='all'));
    container.innerHTML='<section class="hstory" aria-labelledby="hs-title"><div class="hs-rail"><div class="hs-section-name">Research story</div>'+
      '<div class="hs-chapters" role="navigation" aria-label="Story chapters">'+chapters.map((c,i)=>
        '<a href="'+chapterURL(c)+'"'+(i===index?' aria-current="step"':'')+'><span class="hs-step">'+(i+1)+'</span>'+c.tab+'</a>').join('')+'</div></div>'+
      '<div class="hs-spread"><article class="hs-prose"><div class="hs-folio">Chapter '+(index+1)+' of '+chapters.length+'</div><h1 id="hs-title">'+current.title+'</h1>'+
      output.paragraphs.map(p=>'<p>'+p+'</p>').join('')+'<a class="hs-source" href="'+current.link+'">'+current.action+'</a></article>'+output.exhibit+'</div>'+
      '<div class="hs-pages" role="navigation" aria-label="Continue the research story">'+(index>0?'<a rel="prev" href="'+chapterURL(chapters[index-1])+'">Previous chapter</a>':'')+
      (index<chapters.length-1?'<a rel="next" class="hs-next" href="'+chapterURL(chapters[index+1])+'">Next · '+chapters[index+1].tab+'</a>':'<a class="hs-next" href="#overview">Open the benchmark</a>')+'</div></section>';
  };
})();
