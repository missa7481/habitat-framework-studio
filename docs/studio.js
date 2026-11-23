(() => {
  'use strict';
  const main=document.getElementById('content');
  const archive='https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/';
  const original=window.FRAMEWORK_EVIDENCE.studies.map(study=>study.id.startsWith('hico-')
    ? {...study,note:'These two archived rows compare the released hierarchy with a local forest using 105 variables. The Overview also compares a conventional forest given the same 12 historical inputs as the hierarchy. Both comparisons use the same held-out observations.'}
    : study);
  const landscape=window.FRAMEWORK_LANDSCAPE;
  const envStudy=(shift)=>({...landscape,id:'landscape-'+(shift?'shifted':'primary'),title:'Forest cover method test · '+(shift?'shifted':'primary')+' partition',baselineId:'ridge',direction:'lower',note:'This environmental method test predicts an existing forest-cover product. Its errors have a different target and unit from every mosquito experiment.',cohort:'1,309 coarse environmental tiles',rows:landscape.rows.map(r=>({...r,value:shift?r.shiftedValue:r.value}))});
  const studies=[...original,envStudy(false),envStudy(true)];
  const study=id=>studies.find(s=>s.id===id);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const opts=(pairs,current)=>pairs.map(([v,l])=>'<option value="'+esc(v)+'"'+(v===current?' selected':'')+'>'+esc(l)+'</option>').join('');
  const num=x=>Number(x).toFixed(3);
  const signed=x=>(x>0?'+':x<0?'−':'')+num(Math.abs(x));
  const go=(st,row)=>'#experiments/'+encodeURIComponent(st)+(row?'/'+encodeURIComponent(row):'');
  const href=(url,label)=>'<a target="_blank" rel="noopener" href="'+esc(url)+'">'+esc(label)+'</a>';
  const paths={
    data:'<path d="M4 8 16 3l12 5-12 5zM4 15l12 5 12-5M4 22l12 5 12-5"/>',
    rep:'<circle cx="6" cy="16" r="3"/><circle cx="16" cy="6" r="3"/><circle cx="16" cy="26" r="3"/><circle cx="26" cy="16" r="3"/><path d="m8 14 6-6m4 0 6 6m0 4-6 6m-4 0-6-6"/>',
    space:'<circle cx="16" cy="16" r="12"/><ellipse cx="16" cy="16" rx="6" ry="12"/><path d="M4 16h24M6 10h20M6 22h20"/>'
  };
  const icon=k=>'<div class="icon" aria-hidden="true"><svg viewBox="0 0 32 32">'+paths[k]+'</svg></div>';
  const head=(key,title,desc)=>'<div class="page-head"><div><p class="kicker">'+key+'</p><h1>'+title+'</h1><p>'+desc+'</p></div></div>';
  const spec=(pairs)=>'<dl class="spec">'+pairs.map(([a,b])=>'<div><dt>'+esc(a)+'</dt><dd>'+esc(b)+'</dd></div>').join('')+'</dl>';
  const id=s=>document.getElementById(s);
  const linkBtn=(url,title,cl='')=>'<a class="btn '+cl+'" href="'+url+'">'+title+'</a>';
  function overview(){
    window.renderFrameworkOverview(main, window.OVERVIEW_RESULTS, {esc, opts, csvSave});
  }

  const axes={
    target:['Relative suitability ranking','Broad-area share of reports','Multispecies report composition','Repeat-survey detection'],
    inputs:['Climate and terrain','Environment + human activity','Climate + terrain + Earth embedding','Environment + Earth embedding','Environment + Earth embedding + historical pool','Environment + Earth embedding + survey effort'],
    repr:['Explicit variables','Frozen Earth embedding','Separate encoders by modality','Multiscale components','Forest scores with regional adjustment','Direct feature summaries'],
    fusion:['Concatenation','Conditional embedding fusion','Hierarchical learned fusion','Late fusion of branch estimates','Local scores with regional adjustment'],
    spatial:['No explicit spatial term','Spherical spatial basis','Parent–child consistency','Bayesian regional effect'],
    learner:['Regularized regression','Random forest','Beta-binomial report model','Hierarchical composition model','Joint habitat and detection model']
  };
  const named={'target':'Observation target','inputs':'Input families','repr':'Representation learner','fusion':'Fusion method','spatial':'Spatial structure','learner':'Prediction model'};
  const presets=[
    {id:'joint',label:'Proposed joint habitat model',vals:[3,5,2,2,3,4],reason:'Estimate habitat and detection separately using repeated surveys. Learn a representation for each input family, combine them hierarchically, and estimate residual variation among regions. The full mosquito configuration awaits an effort-aware validation trial.'},
    {id:'fixed',label:'Archived complementary spatial fusion',vals:[1,2,3,1,1,2],study:'macro-primary',row:'complementary-spatial-fusion',reason:'A broad-area study combined climate and Earth representations with a spatial term. Its outcome was the species share among submitted mosquito reports.'},
    {id:'hico',label:'Archived HiCo-Fuse 2',vals:[2,4,4,4,2,3],study:'hico-block10',row:'hico-fuse-2',reason:'HiCo-Fuse 2 adjusts a local forest with regional historical information. Its consistency rule links local and regional relative odds of species reporting.'},
    {id:'control',label:'Archived fused logistic control',vals:[1,2,5,0,0,0],study:'macro-primary',row:'logistic-fused',reason:'The control uses the same climate and Earth input families as the broad-area fusion candidate and does not estimate a spatial effect.'}
  ];
  const keys=Object.keys(axes);
  const makePreset=p=>Object.fromEntries(keys.map((k,i)=>[k,axes[k][p.vals[i]]]));
  const equal=(a,b)=>keys.every(k=>a[k]===b[k]);
  const valid=v=>v&&keys.every(k=>axes[k].includes(v[k]));
  let draft=makePreset(presets[0]);
  function readDraft(){try{const v=JSON.parse(localStorage.getItem('habitat-studio-spec-v1'));return valid(v)?v:null;}catch{return null;}}
  function csvSave(name,body,type){const url=URL.createObjectURL(new Blob([body],{type}));const a=document.createElement('a');a.download=name;a.href=url;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);}
  function designer(){
    main.innerHTML=head('Framework','Model designer','Build a candidate from its observation target, input data, representation, fusion and spatial model. Exact archived configurations link to their measured results.')+
      '<div class="grid"><section class="panel"><h2>Model specification</h2><div class="selector small-gap"><label for="preset">Starting configuration</label><select id="preset"></select></div><div class="fields">'+keys.map(k=>'<label for="ax-'+k+'">'+named[k]+'<select id="ax-'+k+'">'+opts(axes[k].map(v=>[v,v]),draft[k])+'</select></label>').join('')+'</div><div class="actions"><button class="btn" id="save-draft">Save on this device</button><button class="btn plain" id="load-draft">Load saved design</button><button class="btn plain" id="export-draft">Export design</button></div><p class="msg" role="status" id="draft-msg"></p></section><section class="panel" id="design-preview" aria-live="polite"></section></div>';
    const sync=()=>{const m=presets.find(p=>equal(makePreset(p),draft));id('preset').innerHTML=opts([...presets.map(p=>[p.id,p.label]),['custom','Custom configuration']],m?.id||'custom');keys.forEach(k=>id('ax-'+k).value=draft[k]);const s=m?.study?study(m.study):null;const r=s?.rows.find(z=>z.id===m.row);
      const prev=id('design-preview');prev.innerHTML='<span class="pill">'+(r?'Archived configuration':'Proposed configuration')+'</span><h2 class="small-gap">'+esc(m?.label||'Custom model design')+'</h2><p>'+esc(m?.reason||'This combination is a research specification. Its performance needs a fit and a held-out comparison on the selected observation target.')+'</p>'+
        spec([['Target',draft.target],['Input families',draft.inputs],['Representation',draft.repr],['Fusion',draft.fusion],['Spatial model',draft.spatial],['Output learner',draft.learner]])+
        (r?'<div class="verdict"><strong>'+num(r.value)+'</strong> '+esc(s.metric.toLowerCase())+' in the selected archived study.</div>'+linkBtn(go(s.id,r.id),'Inspect matched experiment','plain'):
        '<div class="notice">'+(draft.target==='Repeat-survey detection'&&!draft.inputs.includes('effort')?'This design needs per-visit effort and repeated visits before it can distinguish habitat from detection.':'This specification has no linked result in the designer. Browse the experiment tables for related configurations.')+'</div>'+linkBtn('#protocol','Review validation plan','plain'));};
    id('preset').onchange=e=>{const p=presets.find(p=>p.id===e.target.value);if(p){draft=makePreset(p);id('draft-msg').textContent='';sync();}else{id('draft-msg').textContent='Change a model component below to create a custom configuration.';}};
    keys.forEach(k=>id('ax-'+k).onchange=e=>{draft={...draft,[k]:e.target.value};id('draft-msg').textContent='';sync();});
    id('save-draft').onclick=()=>{try{localStorage.setItem('habitat-studio-spec-v1',JSON.stringify(draft));id('draft-msg').textContent='Saved this specification on this device.';}catch{id('draft-msg').textContent='Device storage is unavailable. Use Export design to keep a copy.';}};
    id('load-draft').onclick=()=>{const v=readDraft();if(v){draft=v;sync();}id('draft-msg').textContent=v?'Loaded your saved specification.':'No saved specification is available on this device.';};
    id('export-draft').onclick=()=>{const match=presets.find(p=>equal(makePreset(p),draft));csvSave('habitat-model-design.json',JSON.stringify({schema:1,specification:draft,archivedStudy:match?.study||null,archivedRow:match?.row||null},null,2),'application/json');id('draft-msg').textContent='Exported the model specification.';};
    sync();
  }
  function experiments(stId,rowId){
    const s=study(stId)||study('macro-primary');
    let selected=s.rows.find(r=>r.id===rowId)||s.rows.find(r=>r.id===(s.id.startsWith('landscape-')?'spatial-fusion':'complementary-spatial-fusion'))||s.rows[0];
    let baseline=s.rows.find(r=>r.id===s.baselineId)||s.rows[0];
    main.innerHTML=head('Evidence','Experiment comparisons','Choose an observation target and validation design first. Each score and its comparison come from the same study and partition.')+
      '<section class="panel"><div class="selector"><label for="study">Experiment and held-out design</label><select id="study">'+opts(studies.map(z=>[z.id,z.title]),s.id)+'</select></div><p><strong>'+esc(s.endpoint)+'</strong></p><p>'+esc(s.protocol)+'</p><p class="micro">'+esc(s.cohort||'')+'</p></section>'+
      '<div class="experiment-layout"><section class="panel"><h2>Model results</h2><div class="toolbar"><label class="control">Filter configurations<input id="search" type="search" placeholder="Try Earth, forest or spatial"></label><label class="control">Order<select id="order"><option value="score">Best score first</option><option value="label">Model name</option></select></label></div><p class="micro" id="row-count" aria-live="polite"></p><div class="table-wrap"><table><thead><tr><th>Configuration</th><th class="num">'+esc(s.metric)+'</th></tr></thead><tbody id="model-rows"></tbody></table></div><div class="actions"><button class="btn plain" id="download-study">Download score table</button></div></section><div class="stack"><section class="panel"><div id="model-detail" aria-live="polite"></div><div class="selector small-gap"><label for="baseline">Comparison model</label><select id="baseline">'+opts(s.rows.map(r=>[r.id,r.label]),baseline.id)+'</select></div><div id="pair-result"></div></section></div></div><section class="section panel"><h2>Reading this result</h2><p>'+esc(s.note||s.description)+'</p><div class="anchors">'+href(s.source,s.id.startsWith('landscape-')?'Archived environmental reference':'Open source table')+(s.id.startsWith('macro-')?'<a href="#ablations">Paired sector comparisons</a>':'')+(s.id.startsWith('landscape-')?'<a href="assets/landscape-study.json" download>Download new study results</a>':'')+'</div></section>';
    function rows(){const q=id('search').value.toLowerCase().trim(), alpha=id('order').value==='label',arr=s.rows.filter(r=>[r.label,r.representation,r.data,r.learner,r.spatial].join(' ').toLowerCase().includes(q)).slice().sort((a,b)=>alpha?a.label.localeCompare(b.label):(s.direction==='lower'?a.value-b.value:b.value-a.value)||a.label.localeCompare(b.label));
      id('row-count').textContent=arr.length+' of '+s.rows.length+' configurations · '+(s.direction==='lower'?'Lower':'Higher')+' is better · '+s.units;
      id('model-rows').innerHTML=arr.map(r=>'<tr class="'+(r.id===selected.id?'chosen':'')+'"><td><button type="button" data-row="'+esc(r.id)+'" aria-pressed="'+(r.id===selected.id)+'">'+esc(r.label)+'</button></td><td class="num">'+num(r.value)+'</td></tr>').join('')||'<tr><td colspan="2">No configurations match this search.</td></tr>';
    }
    function detail(){const p=[['Data',selected.data],['Representation',selected.representation]];if(selected.fusion)p.push(['Fusion',selected.fusion]);p.push(['Spatial model',selected.spatial],['Learner',selected.learner]);
      id('model-detail').innerHTML='<span class="pill">'+(s.id.startsWith('landscape-')?'Forest-cover study':s.id==='masked-reconstruction'?'Feature reconstruction study':'Archived mosquito study')+'</span><h2 class="small-gap">'+esc(selected.label)+'</h2>'+spec(p);
      const delta=selected.value-baseline.value;const improved=delta*(s.direction==='lower'?-1:1)>0;const same=selected.id===baseline.id;id('pair-result').innerHTML='<div class="score-box"><div><strong>'+num(selected.value)+'</strong><span>Selected score</span></div><div><strong>'+signed(delta)+'</strong><span>Selected minus comparison</span></div></div><p class="micro">'+(same?'Select another model to see a contrast.':delta===0?'The archived point estimates are equal.':(improved?'Better':'Worse')+' point estimate on this partition. A difference in means alone does not establish statistical significance.')+'</p>';
    }
    id('model-rows').onclick=e=>{const b=e.target.closest('[data-row]');if(!b)return;selected=s.rows.find(r=>r.id===b.dataset.row);rows();detail();history.replaceState(null,'',go(s.id,selected.id));id('model-rows').querySelector('[aria-pressed="true"]')?.focus({preventScroll:true});};
    id('search').oninput=rows;id('order').onchange=rows;id('baseline').onchange=e=>{baseline=s.rows.find(r=>r.id===e.target.value);detail();};
    id('study').onchange=e=>{location.hash=go(e.target.value);};
    id('download-study').onclick=()=>{const quote=v=>'"'+String(v).replaceAll('"','""')+'"';const lines=[['study','endpoint','protocol','model','data','representation','fusion','spatial','learner','metric','units','direction','score'],...s.rows.map(r=>[s.title,s.endpoint,s.protocol,r.label,r.data,r.representation,r.fusion||'',r.spatial,r.learner,s.metric,s.units,s.direction,r.value])];csvSave('habitat-'+s.id+'.csv',lines.map(row=>row.map(quote).join(',')).join('\r\n'),'text/csv;charset=utf-8');};rows();detail();
  }
  function ablations(){
    const contrasts=window.FRAMEWORK_CONTRASTS.rows;
    main.innerHTML=head('Paired evidence','What did each modeling change add?','Each contrast uses the same six broad geographic sectors and the same report-composition outcome. The shifted partition reuses observations.')+
      '<div class="grid"><section class="panel"><h2>Choose a contrast</h2><select class="wide" id="contrast" aria-label="Component contrast">'+opts(contrasts.map((r,i)=>[String(i),r.title]),'3')+'</select><div id="contrast-definition"></div></section><section class="panel" id="contrast-data" aria-live="polite"></section></div><div class="research-band"><div><h3>Selection has its own test</h3><p>The prespecified procedure needed four strict wins in the primary partition. It won three and tied once against the matched logistic model.</p></div>'+linkBtn(go('macro-primary','all-family-rsi-cycle-2'),'Inspect the selector','plain')+'</div>';
    function render(){const r=contrasts[Number(id('contrast').value)];id('contrast-definition').innerHTML=spec([['Candidate',r.candidate],['Comparison',r.reference]])+'<p>'+esc(r.meaning)+'</p><p class="micro">Difference = candidate loss minus comparison loss. Negative values favor the candidate.</p>';id('contrast-data').innerHTML='<h2>Paired log-loss differences</h2>'+r.outcomes.map(o=>'<div class="contrast-stats"><div><strong>'+signed(o.mean)+'</strong><span>Mean difference · '+(o.origin===0?'primary':'shifted')+'</span></div><div><strong>'+o.wins+' / '+o.n+'</strong><span>Strict wins · '+o.ties+' tied</span></div></div>').join('')+'<p class="micro">Units are nats per report. The two partitions do not provide twelve independent sectors.</p><div class="anchors">'+href(archive+'transfer/rsi_macro/sector_metrics.csv','Archived sector scores')+'</div>';};id('contrast').onchange=render;render();
  }
  function protocol(section){
    const guide=(title,body,open=false)=>'<details'+(open?' open':'')+'><summary>'+title+'</summary>'+body+'</details>';
    main.innerHTML=head('Research protocol','How to evaluate an integrated habitat model','The research unit is a complete combination of data, representation, fusion, spatial structure and observation model. Each comparison needs a clearly defined target.')+
    '<div class="grid"><div class="study-list">'+
    guide('Observation sources and input datasets','<p>The 2024 presence–background study used iNaturalist records accessed through the Global Biodiversity Information Facility and Austrian surveillance from the Agency for Health and Food Safety. US National Ecological Observatory Network trap surveys have separate detection labels. Counts of other reported mosquitoes supply background for the reporting benchmark.</p><p>Environmental families include WorldClim normals, ERA5-Land weather, land cover, vegetation, water, terrain and human activity. Annual Earth observation embeddings offer another view of the same environment. Each study lists the input families it actually used.</p>',!section || section==='data')+
    guide('Targets and spatial alignment','<p>The mapping objective is relative habitat suitability for <i>Aedes albopictus</i>. Community reporting composition, site detection and abundance are distinct targets. Repeated visits and effort support a detection model; effort-standardized counts would support an abundance study.</p><p>Match inputs to the label year, retain native resolution and coordinate uncertainty, and compare candidate buffers on common support. The 100, 250 and 500 m Sentinel-2 work established feature coverage and stability; its habitat performance comparison is pending.</p>')+
    guide('Model architecture and ablations','<p>Learn a representation for each data family within training folds. Compare explicit variables, frozen Earth embeddings and learned representations. Combine views by concatenation, separate prediction heads or hierarchical fusion. Compare a nonspatial head with a spatial term and, where repeated surveys exist, a separate observation model.</p><p>Change one component at a time for attribution. Also test the complete system against a conventional model given the same inputs, observation target and tuning effort. A better bundled score does not identify which component caused the gain.</p>')+
    guide('Spatial validation and model choice','<p>Keep an outer region or survey year out of all feature fitting and model selection. Use training-only partitions to select representations, fusion and spatial structure. Record the reference cohort, prediction support and missingness. Freeze the selected procedure before a new survey is evaluated.</p><p>Report average precision for presence–background ranking, held-out log loss for composition and effort-aware predictive loss for repeated surveys. Compare scores within their study. Report regional variation and uncertainty; a reduction in the mean can hide a worse region.</p>')+
    guide('Release decision and independent validation','<p>The broad-area candidate reduced average loss against its matched logistic comparator. The nested procedure won three primary sectors and needed four. In the separate five-category reporting study, the released HiCo-Fuse 2 version had 0.09% lower mean loss than a conventional forest given the same historical inputs. It won nine of 20 splits. The forest ranked the reported categories better on average. <a href="#overview">Explore the model comparison</a>.</p><p>The next habitat test needs a previously unused regional survey with documented effort, reserved before model selection.</p>')+
    '</div><div class="stack"><section class="panel"><span class="pill">New environmental method test</span><h2 class="small-gap">Does a more complex spatial model help?</h2><p>We tested an integrated kernel model on forest-cover fraction across 1,309 coarse tiles. It combines separate feature representations, data fusion and spatially varying effects.</p><p><strong>'+landscape.rows.find(r=>r.id==='spatial-fusion').value.toFixed(2)+' vs '+landscape.rows.find(r=>r.id==='ridge').value.toFixed(2)+'</strong> percentage points of root mean squared error. The matched Bayesian ridge control had the lower error. This is evidence about forest-cover reconstruction.</p><div class="actions">'+linkBtn(go('landscape-primary','spatial-fusion'),'See controls and ablations','plain')+'</div></section><section class="panel"><h2>Metric definitions</h2><p><b>Average precision</b> weights precision by the increase in recall as each score threshold is reached. Higher values indicate better ranking within the sampled cohort.</p><p><b>Negative log likelihood</b> penalizes low probability assigned to the observed outcome. Lower values are better.</p><p><b>Root mean squared error</b> measures typical prediction error in the outcome’s units and gives larger errors more weight.</p></section></div></div>';
  }
  const sheet=id('methods-sheet');
  id('show-methods').addEventListener('click',()=>sheet.showModal());
  sheet.addEventListener('click',event=>{
    if(event.target.closest('a[href^="#"]')) sheet.close();
    if(event.target===sheet){
      const box=sheet.getBoundingClientRect();
      if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)sheet.close();
    }
  });
  document.querySelector('.skip').addEventListener('click',event=>{
    event.preventDefault();
    main.focus({preventScroll:true});
    main.scrollIntoView({block:'start'});
  });
  const sections={live:'Explore',story:'Research story',overview:'Benchmark results',experiments:'Experiments',
    ablations:'Paired comparisons',designer:'Model designer',protocol:'Study design'};
  const benchmarkPages=new Set(['overview','experiments','ablations','designer']);
  function markCurrent(selector,current){
    document.querySelectorAll(selector).forEach(link=>{
      if(link.hash==='#'+current)link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
  }
  let last=null;
  function route(){
    const raw=location.hash.slice(1);
    const [name,arg='',row='']=raw.split('/');
    const atlasRoute=['','live','coverage','explore'].includes(name);
    const page=atlasRoute?'live':Object.hasOwn(sections,name)?name:'overview';
    const mode=benchmarkPages.has(page)?'overview':page;
    document.body.dataset.mode=mode;
    id('benchmark-nav').hidden=mode!=='overview';
    markCurrent('.mode-switch a',mode);
    markCurrent('#benchmark-nav a',page);
    if (sheet.open) sheet.close();
    if(page==='live')window.renderHabitatAtlas(main,arg==='performance'?'performance':'coverage');
    else if(page==='story')window.renderHabitatStory(main,arg);
    else if(page==='designer')designer();
    else if(page==='experiments')experiments(arg,row);
    else if(page==='ablations')ablations();
    else if(page==='protocol')protocol(arg);
    else overview();
    document.title=sections[page]+' · Habitat Framework Studio';
    if(last!==null&&last!==raw){main.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
    last=raw;
  }
  window.addEventListener('hashchange',route);route();
})();
