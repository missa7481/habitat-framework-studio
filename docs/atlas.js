/* Present the archived input-availability and broad-sector evaluations in a shared atlas. */
(() => {
  'use strict';

  const layers = {
    coverage: {
      href: '#coverage', label: 'Environmental inputs', caption: 'Global coverage · 2024',
      title: 'Environmental input coverage', subtitle: 'Availability of the environmental feature stack on the archived global grid.'
    },
    performance: {
      href: '#coverage/performance', label: 'Model performance', caption: 'Six held-out sectors',
      title: 'Held-out model performance', subtitle: 'Compare model errors for the Asian tiger mosquito’s share of submitted reports in six broad sectors.'
    }
  };
  const geographicLabels = [
    ['North America', -106, 47], ['South America', -59, -14], ['Europe', 25, 54],
    ['Africa', 19, 9], ['Asia', 92, 45], ['Australia', 134, -25],
    ['Pacific Ocean', -138, -14, true], ['Atlantic Ocean', -33, 18, true], ['Indian Ocean', 77, -28, true]
  ];
  const assetBase=new URL('.',document.currentScript?.src || document.baseURI);

  function installRelief(map, controls) {
    const field=map.querySelector('.fwcov-field');
    const relief=document.createElement('img');
    relief.className='atlas-terrain';
    relief.alt='';
    relief.draggable=false;
    const control=document.createElement('label');
    control.className='atlas-switch';
    const input=document.createElement('input');
    input.type='checkbox';input.checked=true;
    input.setAttribute('aria-controls',map.querySelector('.fwcov-view').id);
    control.append(input,document.createTextNode('Terrain shading'));
    controls.append(control);
    const credit=document.createElement('a');
    credit.href='https://www.naturalearthdata.com/downloads/50m-raster-data/50m-natural-earth-2/';
    credit.rel='noopener';credit.target='_blank';credit.textContent='Relief · Natural Earth';
    map.querySelector('.fwcov-facts').append(credit);
    input.addEventListener('change',()=>{relief.hidden=!input.checked;});
    relief.addEventListener('error',()=>{relief.remove();control.remove();credit.remove();});
    field.append(relief);
    relief.src=new URL('assets/world-relief.webp',assetBase).href;
  }

  function chapter(view, selected) {
    const layer=layers[view];
    return '<a class="atlas-choice" href="'+layer.href+'"'+(selected?' aria-current="page"':'')+'>'+
      '<span class="atlas-layer-symbol atlas-symbol-'+view+'" aria-hidden="true"></span>'+
      '<span><b>'+layer.label+'</b><small>'+layer.caption+'</small></span>'+
      '<span class="atlas-selected-mark" aria-hidden="true"></span></a>';
  }

  function labelGeography(field) {
    const overlay=document.createElement('div');
    overlay.className='atlas-geography';
    overlay.setAttribute('aria-hidden','true');
    for (const [name,longitude,latitude,water] of geographicLabels) {
      const tag=document.createElement('span');
      tag.className=water?'atlas-ocean':'atlas-land';
      tag.textContent=name;
      tag.style.left=(longitude+180)/360*100+'%';
      tag.style.top=(85-latitude)/170*100+'%';
      overlay.append(tag);
    }
    field.append(overlay);
  }

  function showBenchmark(container) {
    const data=window.OVERVIEW_RESULTS;
    const scope=data?.scopes?.find(s=>s.id==='all');
    if (!scope) return;
    const leader=scope.rows.reduce((best,r)=>r.nll<best.nll?r:best);
    const reference=scope.rows.find(r=>r.arm===data.matched);
    if (!reference || !reference.nll) return;
    const gain=100*(reference.nll-leader.nll)/reference.nll;
    const section=document.createElement('section');
    section.className='atlas-benchmark';
    section.setAttribute('aria-labelledby','atlas-benchmark-title');
    section.innerHTML='<div class="atlas-result-copy"><p class="atlas-label">Five-category report-composition benchmark</p>'+
      '<h2 id="atlas-benchmark-title"></h2><p class="atlas-result-design"></p></div>'+
      '<div class="atlas-result-number"><strong></strong><span>Lower mean log loss than the source-matched forest</span></div>'+
      '<div class="atlas-result-number"><strong></strong><span>Paired splits with lower loss</span></div>'+
      '<a href="#overview" class="atlas-link">Compare models <span aria-hidden="true">↗</span></a>';
    section.querySelector('h2').textContent=leader.label;
    section.querySelector('.atlas-result-design').textContent='Lowest mean loss across '+scope.rows.length+
      ' configurations on the same '+scope.folds+' held-out splits.';
    const numbers=section.querySelectorAll('strong');
    numbers[0].textContent=gain.toFixed(2)+'%';
    numbers[1].textContent=leader.winsMatched+' / '+scope.folds;
    container.append(section);
  }

  window.renderHabitatAtlas = function(container, view='coverage') {
    const performance=view==='performance';
    const id=performance?'performance':'coverage', layer=layers[id];
    container.innerHTML='<div class="atlas-workspace"><div class="atlas-console"><aside class="atlas-rail" aria-label="Map layers and controls">'+
      '<div class="atlas-intro"><h1>Global habitat atlas</h1><p>Explore the environmental data and geographic tests behind our mosquito habitat research.</p></div>'+
      '<div class="atlas-layer-list" role="group" aria-labelledby="atlas-layer-title"><h2 class="atlas-label" id="atlas-layer-title">Map layers</h2>'+
      chapter('coverage',!performance)+chapter('performance',performance)+'</div>'+
      '<details class="atlas-parameters" open><summary>Layer controls</summary><div class="atlas-tool-slot"></div></details>'+
      '<div class="atlas-cohort"><h2 class="atlas-label">'+(performance?'Sector-evaluation cohort':'Benchmark cohort')+'</h2><dl><div><dt>Community reports</dt><dd>'+
      (performance?'17,159':'17,232')+'</dd></div><div><dt>'+(performance?'Broad tiles':'Observed grid cells')+'</dt><dd>'+(performance?'113':'7,004')+'</dd></div></dl></div>'+
      '<a class="atlas-method-link" href="#protocol">Study design <span aria-hidden="true">↗</span></a></aside>'+
      '<section class="atlas-stage" aria-labelledby="atlas-stage-title"><header class="atlas-stage-head"><div>'+
      '<h2 id="atlas-stage-title">'+layer.title+'</h2><p>'+layer.subtitle+'</p></div>'+
      '<span class="atlas-stage-meta">'+(performance?'Retrospective evaluation':'2024 snapshot')+'</span></header>'+
      '<div id="coverage-map"></div></section></div></div>';
    const workspace=container.querySelector('.atlas-workspace');
    const map=workspace.querySelector('#coverage-map');
    const controls=workspace.querySelector('.atlas-tool-slot');
    if (performance) {
      window.renderSectorMap(map);
      controls.classList.add('secmap');
      controls.append(map.querySelector('.secmap-tools'));
      labelGeography(map.querySelector('.secmap-world'));
    } else {
      window.renderCoverage(map);
      controls.classList.add('fwcov');
      const caption=document.createElement('label');
      caption.textContent='Input display';
      const select=map.querySelector('select');
      select.id='atlas-coverage-mode';
      caption.htmlFor=select.id;
      const shell=map.querySelector('.fwcov-select-shell');
      const extent=document.createElement('span');
      extent.className='atlas-extent';extent.textContent='North-up · 85°S to 85°N';
      map.querySelector('.fwcov-tools').prepend(extent);
      const field=document.createElement('div');
      field.className='atlas-input-field fwcov-tools';
      field.append(caption,shell);
      controls.append(field);
      installRelief(map,controls);
      labelGeography(map.querySelector('.fwcov-field'));
    }
    if (window.matchMedia('(max-width: 740px)').matches) {
      workspace.querySelector('.atlas-parameters').open=false;
    }
    showBenchmark(workspace);
  };
})();
