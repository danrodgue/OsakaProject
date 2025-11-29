$(function(){
  var ORDER_KEY = 'osakaOrder';
  var menuData = [
    { id:'cat-sushi', name:'Sushi', subcategories:[
      { id:'sc-makis', name:'Makis', dishes:[
        { id:'maki-salmon', name:'Maki de salmón', base:['arroz','salmón','alga'], extras:['aguacate','queso'] },
        { id:'maki-atun', name:'Maki de atún', base:['arroz','atún','alga'], extras:['cebollino','mayonesa'] }
      ]},
      { id:'sc-nigiri', name:'Nigiri', dishes:[
        { id:'nigiri-salmon', name:'Nigiri de salmón', base:['arroz','salmón'], extras:['wasabi','salsa soja'] },
        { id:'nigiri-gamba', name:'Nigiri de gamba', base:['arroz','gamba'], extras:['limón','salsa soja'] }
      ]}
    ]},
    { id:'cat-caldo', name:'Caldo', subcategories:[
      { id:'sc-ramen', name:'Ramen', dishes:[
        { id:'ramen-miso', name:'Ramen miso', base:['caldo','fideos','miso'], extras:['huevo','maíz','algas'] },
        { id:'ramen-soja', name:'Ramen soja', base:['caldo','fideos','soja'], extras:['huevo','bamboo'] }
      ]},
      { id:'sc-udon', name:'Udon', dishes:[
        { id:'udon-tempura', name:'Udon tempura', base:['caldo','fideos udon','tempura'], extras:['cebollino','huevo'] },
        { id:'udon-carne', name:'Udon con carne', base:['caldo','fideos udon','ternera'], extras:['setas','cebolla'] }
      ]}
    ]}
  ];

  var buffets = [
    { id:'buffet-standard', name:'Buffet Estándar', pricePerPerson:12 },
    { id:'buffet-premium', name:'Buffet Premium', pricePerPerson:18 }
  ];

  function getParams(){ var p={}; location.search.replace(/^[?]/,'').split('&').forEach(function(kv){ if(!kv) return; var s=kv.split('='); p[decodeURIComponent(s[0])] = decodeURIComponent(s[1]||''); }); return p; }
  function loadOrder(){ try{ return JSON.parse(localStorage.getItem(ORDER_KEY))||{ mesa:null, personas:0, buffet:null, items:[], selectedByCategory:{}, currentCategory:null }; }catch(e){ return { mesa:null, personas:0, buffet:null, items:[], selectedByCategory:{}, currentCategory:null }; } }
  function saveOrder(o){ localStorage.setItem(ORDER_KEY, JSON.stringify(o)); }
  function alertMsg(type,text){ var c=$('#pedidoAlerts'); if(!c.length) return; c.empty().append('<div class="alert alert-'+type+'" role="alert">'+text+'</div>'); setTimeout(function(){ c.find('.alert').fadeOut(300,function(){ $(this).remove(); }); }, 2500); }

  var path = location.pathname.toLowerCase();

  if (path.endsWith('/index.html') || path.endsWith('/') ) {
    var order = loadOrder();
    var sel = $('#mesaSelect'); for (var i=1;i<=20;i++){ sel.append('<option value="'+i+'">Mesa '+i+'</option>'); }
    var qp = getParams(); if (qp.mesa) sel.val(qp.mesa); if (qp.personas) $('#personasInput').val(qp.personas);
    $('#btnContinuar1').on('click', function(){
      var mesa = $('#mesaSelect').val(); var personas = parseInt($('#personasInput').val(),10);
      if (!mesa || !personas || personas<1){ alertMsg('warning','Completa mesa y número de personas'); return; }
      order.mesa = mesa; order.personas = personas; saveOrder(order);
      fetch('/api/sessions',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ mesa: mesa, personas: personas }) });
      location.href = 'buffet.html';
    });
  }

  if (path.endsWith('/buffet.html')){
    var order = loadOrder(); if (!order.personas){ location.href='index.html'; return; }
    var cont = $('#buffetOptions'); cont.empty();
    buffets.forEach(function(b){ cont.append('<label class="btn btn-outline-primary mr-2"><input type="radio" name="buffet" value="'+b.id+'" autocomplete="off"> '+b.name+' ('+b.pricePerPerson+'€/persona)</label>'); });
    function updateTotal(){ if(!order.buffet){ $('#buffetTotal').text(''); return; } $('#buffetTotal').text('Total: '+(order.personas*order.buffet.pricePerPerson)+'€'); }
    $('#buffetOptions').on('change','input[name="buffet"]', function(){ var id=$(this).val(); order.buffet = buffets.find(function(b){return b.id===id;}); saveOrder(order); updateTotal(); });
    $('#btnContinuar2').on('click', function(){ if(!order.buffet){ alertMsg('warning','Selecciona un buffet'); return; } location.href='menu.html'; });
    updateTotal();
  }

  if (path.endsWith('/menu.html')){
    var order = loadOrder(); if (!order.personas || !order.buffet){ location.href='index.html'; return; }
    var tabs = $('#categoryTabs'); tabs.empty();
    menuData.forEach(function(cat,idx){ var a = $('<a class="nav-link '+(idx===0?'active':'')+'" href="#" data-cat="'+cat.id+'">'+cat.name+'</a>'); a.on('click', function(e){ e.preventDefault(); selectCategory($(this).data('cat')); }); tabs.append(a); });
    function selectCategory(catId){ order.currentCategory = catId; if(!order.selectedByCategory[catId]) order.selectedByCategory[catId] = { count: 0 }; saveOrder(order); renderSub(catId); renderDishes(catId,null); updateCounter(); }
    function renderSub(catId){ var sub = $('#subcategoryTabs'); sub.empty(); var cat = menuData.find(function(c){return c.id===catId;}); if(!cat) return; cat.subcategories.forEach(function(sc,idx){ var a = $('<a class="nav-link '+(idx===0?'active':'')+'" href="#" data-sub="'+sc.id+'">'+sc.name+'</a>'); a.on('click', function(e){ e.preventDefault(); renderDishes(catId, $(this).data('sub')); }); sub.append(a); }); }
    function canAdd(catId){ var limit = order.personas*5; var count = (order.selectedByCategory[catId]?order.selectedByCategory[catId].count:0); return count<limit; }
    function updateCounter(){ var limit = order.personas*5; var count = (order.selectedByCategory[order.currentCategory]?order.selectedByCategory[order.currentCategory].count:0); $('#categoryCounter').text(count+' / '+limit+' platos en categoría'); }
    function renderDishes(catId, subId){ var grid=$('#dishGrid'); grid.empty(); var cat=menuData.find(function(c){return c.id===catId;}); if(!cat) return; var subs = subId?cat.subcategories.filter(function(s){return s.id===subId;}):cat.subcategories; subs.forEach(function(sc){ sc.dishes.forEach(function(d){ var disabled = canAdd(catId)?'':'disabled'; var col=$('<div class="col-md-3 mb-3"></div>'); var card=$('<div class="card"><div class="card-body"><h6>'+d.name+'</h6><a class="btn btn-sm btn-primary '+disabled+'" href="dish.html?dishId='+d.id+'&catId='+catId+'">Personalizar</a></div></div>'); col.append(card); grid.append(col); }); }); }
    function renderSelected(){ var ul=$('#seleccionadosList'); ul.empty(); order.items.forEach(function(it,idx){ var li=$('<li class="list-group-item d-flex justify-content-between align-items-center"></li>'); li.append('<span>'+it.name+'</span>'); var btn=$('<button class="btn btn-sm btn-outline-danger">Quitar</button>'); btn.on('click', function(){ var catId = it.categoryId; order.items.splice(idx,1); if(order.selectedByCategory[catId]) order.selectedByCategory[catId].count = Math.max(0, order.selectedByCategory[catId].count-1); saveOrder(order); updateCounter(); renderDishes(order.currentCategory,null); renderSelected(); }); li.append(btn); ul.append(li); }); }
    $('#btnConfirmarCategoria').on('click', function(){ var catId = order.currentCategory; if(!catId) return; if(!order.selectedByCategory[catId]) order.selectedByCategory[catId] = { count: 0 }; order.selectedByCategory[catId].count = 0; saveOrder(order); updateCounter(); renderDishes(catId,null); alertMsg('success','Se han confirmado los platos de la categoría. Puedes seguir eligiendo.'); });
    $('#btnResumen').on('click', function(){ var c=$('#resumenContainer'); c.empty(); c.append('<p>Personas: '+order.personas+'</p>'); c.append('<p>Mesa: '+order.mesa+'</p>'); c.append('<p>Buffet: '+order.buffet.name+' ('+order.buffet.pricePerPerson+'€/persona)</p>'); var list=$('<ul class="list-group mt-2"></ul>'); order.items.forEach(function(it){ list.append('<li class="list-group-item">'+it.name+' - '+it.ingredients.base.join(', ')+' '+(it.ingredients.extras.length?('+ '+it.ingredients.extras.join(', ')):'')+'</li>'); }); c.append(list); });
    $('#btnEnviarPedido').on('click', function(){ var payload = { mesa: order.mesa, personas: order.personas, buffetId: order.buffet.id, total: order.personas*order.buffet.pricePerPerson, items: order.items }; saveOrder(order); fetch('/api/orders',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) }).then(function(r){ return r.ok?r.json():Promise.reject(r); }).then(function(){ alertMsg('success','Pedido enviado'); }).catch(function(){ alertMsg('warning','No se pudo enviar. Guardado localmente.'); }); });
    selectCategory(menuData[0].id); renderSelected();
  }

  if (path.endsWith('/dish.html')){
    var order = loadOrder(); var params = getParams(); var catId=params.catId; var dishId=params.dishId; var dish=null; menuData.forEach(function(cat){ cat.subcategories.forEach(function(sc){ sc.dishes.forEach(function(d){ if(d.id===dishId) dish=d; }); }); }); if(!dish){ location.href='menu.html'; return; }
    $('#dishTitle').text(dish.name);
    var baseWrap=$('<div class="mb-3"></div>'); baseWrap.append('<h6>Ingredientes base</h6>'); dish.base.forEach(function(ing){ var id='base-'+ing.replace(/\s+/g,'-'); baseWrap.append('<div class="form-check"><input class="form-check-input" type="checkbox" id="'+id+'" checked data-type="base" data-name="'+ing+'"><label class="form-check-label" for="'+id+'">'+ing+'</label></div>'); });
    var extraWrap=$('<div class="mb-3"></div>'); extraWrap.append('<h6>Extras</h6>'); dish.extras.forEach(function(ing){ var id='extra-'+ing.replace(/\s+/g,'-'); extraWrap.append('<div class="form-check"><input class="form-check-input" type="checkbox" id="'+id+'" data-type="extra" data-name="'+ing+'"><label class="form-check-label" for="'+id+'">'+ing+'</label></div>'); });
    $('#ingredientsContainer').append(baseWrap).append(extraWrap);
    $('#dishAddBtn').on('click', function(){ var canAdd = (function(){ var limit = order.personas*5; var count=(order.selectedByCategory[catId]?order.selectedByCategory[catId].count:0); return count<limit; })(); if(!canAdd){ alertMsg('info','Has alcanzado el límite de la categoría. Confirma en el menú para reiniciar.'); return; } var selectedBase=[], selectedExtra=[]; $('#ingredientsContainer input').each(function(){ var t=$(this).data('type'); var n=$(this).data('name'); if($(this).is(':checked')){ if(t==='base') selectedBase.push(n); if(t==='extra') selectedExtra.push(n); } }); order.items.push({ dishId:dish.id, name:dish.name, categoryId:catId, ingredients:{ base:selectedBase, extras:selectedExtra } }); if(!order.selectedByCategory[catId]) order.selectedByCategory[catId]={ count:0 }; order.selectedByCategory[catId].count += 1; saveOrder(order); location.href='menu.html'; });
  }
});
