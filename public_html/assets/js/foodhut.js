/*!
=========================================================
* FoodHut Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function () {
    $(".navbar .nav-link").on('click', function (event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function () {
                window.location.hash = hash;
            });
        }
    });
});

// Inicialización de animaciones wow.js
new WOW().init();

// Inicializa el mapa de Google (demo)
function initMap() {
    var uluru = { lat: 37.227837, lng: -95.700513 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

// Lógica principal del flujo de pedido QR
$(function () {
    // Estado de la sesión y del pedido
    var state = {
        currentStep: 1,
        mesa: null,
        personas: 0,
        buffet: null,
        currentCategory: null,
        selectedByCategory: {},
        selectedItems: [],
        lockedCategories: {}
    };

    // Opciones de buffet con precio por persona
    var buffets = [
        { id: 'buffet-standard', name: 'Buffet Estándar', pricePerPerson: 12 },
        { id: 'buffet-premium', name: 'Buffet Premium', pricePerPerson: 18 }
    ];

    // Datos de menú: categorías, subcategorías y platos con ingredientes
    var menuData = [
        {
            id: 'cat-sushi',
            name: 'Sushi',
            subcategories: [
                {
                    id: 'sc-makis',
                    name: 'Makis',
                    dishes: [
                        { id: 'maki-salmon', name: 'Maki de salmón', base: ['arroz', 'salmón', 'alga'], extras: ['aguacate', 'queso'] },
                        { id: 'maki-atun', name: 'Maki de atún', base: ['arroz', 'atún', 'alga'], extras: ['cebollino', 'mayonesa'] }
                    ]
                },
                {
                    id: 'sc-nigiri',
                    name: 'Nigiri',
                    dishes: [
                        { id: 'nigiri-salmon', name: 'Nigiri de salmón', base: ['arroz', 'salmón'], extras: ['wasabi', 'salsa soja'] },
                        { id: 'nigiri-gamba', name: 'Nigiri de gamba', base: ['arroz', 'gamba'], extras: ['limón', 'salsa soja'] }
                    ]
                }
            ]
        },
        {
            id: 'cat-caldo',
            name: 'Caldo',
            subcategories: [
                {
                    id: 'sc-ramen',
                    name: 'Ramen',
                    dishes: [
                        { id: 'ramen-miso', name: 'Ramen miso', base: ['caldo', 'fideos', 'miso'], extras: ['huevo', 'maíz', 'algas'] },
                        { id: 'ramen-soja', name: 'Ramen soja', base: ['caldo', 'fideos', 'soja'], extras: ['huevo', 'bamboo'] }
                    ]
                },
                {
                    id: 'sc-udon',
                    name: 'Udon',
                    dishes: [
                        { id: 'udon-tempura', name: 'Udon tempura', base: ['caldo', 'fideos udon', 'tempura'], extras: ['cebollino', 'huevo'] },
                        { id: 'udon-carne', name: 'Udon con carne', base: ['caldo', 'fideos udon', 'ternera'], extras: ['setas', 'cebolla'] }
                    ]
                }
            ]
        }
    ];

    // Lee parámetros de la URL (ej: ?mesa=5&personas=2)
    function getUrlParams() {
        var params = {};
        var q = window.location.search.substring(1).split('&');
        for (var i = 0; i < q.length; i++) {
            var kv = q[i].split('=');
            if (kv[0]) params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
        }
        return params;
    }

    // Inicializa selector de mesa y precarga valores desde la URL
    function initMesaSelect() {
        var sel = $('#mesaSelect');
        for (var i = 1; i <= 20; i++) {
            sel.append('<option value="' + i + '">Mesa ' + i + '</option>');
        }
        var params = getUrlParams();
        if (params.mesa) sel.val(params.mesa);
        if (params.personas) $('#personasInput').val(params.personas);
    }

    // Pinta opciones de buffet como radios
    function renderBuffets() {
        var container = $('#buffetOptions');
        container.empty();
        buffets.forEach(function (b) {
            var html = '<label class="btn btn-outline-primary mr-2">' +
                '<input type="radio" name="buffet" value="' + b.id + '" autocomplete="off"> ' + b.name + ' (' + b.pricePerPerson + '€/persona)' +
                '</label>';
            container.append(html);
        });
    }

    // Actualiza el total del buffet: personas * precio
    function updateBuffetTotal() {
        if (!state.buffet) { $('#buffetTotal').text(''); return; }
        var total = state.personas * state.buffet.pricePerPerson;
        $('#buffetTotal').text('Total: ' + total + '€');
    }

    // Pestañas de categorías y selección inicial
    function renderCategories() {
        var tabs = $('#categoryTabs');
        tabs.empty();
        menuData.forEach(function (cat, idx) {
            var active = idx === 0 ? 'active' : '';
            var item = $('<a class="nav-link ' + active + '" href="#" data-cat="' + cat.id + '">' + cat.name + '</a>');
            item.on('click', function (e) { e.preventDefault(); selectCategory($(this).data('cat')); });
            tabs.append(item);
        });
        selectCategory(menuData[0].id);
    }

    // Cambia la categoría actual y renderiza subcategorías y platos
    function selectCategory(catId) {
        state.currentCategory = catId;
        if (!state.selectedByCategory[catId]) state.selectedByCategory[catId] = { count: 0 };
        renderSubcategories(catId);
        renderDishes(catId, null);
        updateCategoryCounter();
    }

    // Pinta pestañas de subcategorías de la categoría actual
    function renderSubcategories(catId) {
        var subTabs = $('#subcategoryTabs');
        subTabs.empty();
        var cat = menuData.find(function (c) { return c.id === catId; });
        if (!cat) return;
        cat.subcategories.forEach(function (sc, idx) {
            var active = idx === 0 ? 'active' : '';
            var item = $('<a class="nav-link ' + active + '" href="#" data-sub="' + sc.id + '">' + sc.name + '</a>');
            item.on('click', function (e) { e.preventDefault(); renderDishes(catId, $(this).data('sub')); });
            subTabs.append(item);
        });
    }

    // Verifica si se puede añadir más platos en la categoría según el límite
    function canAddInCategory(catId) {
        var limit = state.personas * 5;
        var count = (state.selectedByCategory[catId] ? state.selectedByCategory[catId].count : 0);
        return count < limit && !state.lockedCategories[catId];
    }

    // Muestra contador "seleccionados / límite" para la categoría actual
    function updateCategoryCounter() {
        var limit = state.personas * 5;
        var count = (state.selectedByCategory[state.currentCategory] ? state.selectedByCategory[state.currentCategory].count : 0);
        $('#categoryCounter').text(count + ' / ' + limit + ' platos en categoría');
    }

    // Pinta las tarjetas de platos para la subcategoría seleccionada
    function renderDishes(catId, subId) {
        var grid = $('#dishGrid');
        grid.empty();
        var cat = menuData.find(function (c) { return c.id === catId; });
        if (!cat) return;
        var subs = subId ? cat.subcategories.filter(function (s) { return s.id === subId; }) : cat.subcategories;
        subs.forEach(function (sc) {
            sc.dishes.forEach(function (d) {
                var disabled = canAddInCategory(catId) ? '' : 'disabled';
                var col = $('<div class="col-md-3 mb-3"></div>');
                var card = $('<div class="card"><div class="card-body"><h6>' + d.name + '</h6><button class="btn btn-sm btn-primary" ' + disabled + ' data-dish="' + d.id + '">Seleccionar</button></div></div>');
                card.find('button').on('click', function () { openDishModal(catId, d); });
                col.append(card);
                grid.append(col);
            });
        });
    }

    // Abre el modal de personalización de ingredientes para un plato
    function openDishModal(catId, dish) {
        $('#dishModalTitle').text(dish.name);
        $('#ingredientsContainer').empty();
        var baseWrap = $('<div class="mb-3"></div>');
        baseWrap.append('<h6>Ingredientes base</h6>');
        dish.base.forEach(function (ing) {
            var id = 'base-' + ing.replace(/\s+/g, '-');
            baseWrap.append('<div class="form-check"><input class="form-check-input" type="checkbox" id="' + id + '" checked data-type="base" data-name="' + ing + '"><label class="form-check-label" for="' + id + '">' + ing + '</label></div>');
        });
        var extraWrap = $('<div class="mb-3"></div>');
        extraWrap.append('<h6>Extras</h6>');
        dish.extras.forEach(function (ing) {
            var id = 'extra-' + ing.replace(/\s+/g, '-');
            extraWrap.append('<div class="form-check"><input class="form-check-input" type="checkbox" id="' + id + '" data-type="extra" data-name="' + ing + '"><label class="form-check-label" for="' + id + '">' + ing + '</label></div>');
        });
        $('#ingredientsContainer').append(baseWrap).append(extraWrap);
        $('#dishModal').data('dish', dish).data('cat', catId).modal('show');
    }

    // Añade el plato personalizado a la cesta y actualiza contador
    $('#dishModalAddBtn').on('click', function () {
        var modal = $('#dishModal');
        var dish = modal.data('dish');
        var catId = modal.data('cat');
        if (!canAddInCategory(catId)) { modal.modal('hide'); return; }
        var selectedBase = [];
        var selectedExtra = [];
        $('#ingredientsContainer input').each(function () {
            var t = $(this).data('type');
            var n = $(this).data('name');
            if ($(this).is(':checked')) {
                if (t === 'base') selectedBase.push(n);
                if (t === 'extra') selectedExtra.push(n);
            }
        });
        state.selectedItems.push({
            dishId: dish.id,
            name: dish.name,
            categoryId: catId,
            ingredients: { base: selectedBase, extras: selectedExtra }
        });
        if (!state.selectedByCategory[catId]) state.selectedByCategory[catId] = { count: 0 };
        state.selectedByCategory[catId].count += 1;
        updateCategoryCounter();
        renderDishes(catId, null);
        renderSeleccionados();
        modal.modal('hide');
        maybeNotifyLimit(catId);
    });

    // Lista los platos seleccionados y permite quitarlos
    function renderSeleccionados() {
        var ul = $('#seleccionadosList');
        ul.empty();
        state.selectedItems.forEach(function (it, idx) {
            var li = $('<li class="list-group-item d-flex justify-content-between align-items-center"></li>');
            li.append('<span>' + it.name + '</span>');
            var btn = $('<button class="btn btn-sm btn-outline-danger">Quitar</button>');
            btn.on('click', function () { removeItem(idx); });
            li.append(btn);
            ul.append(li);
        });
    }

    // Quita un plato seleccionado y ajusta contador de la categoría
    function removeItem(idx) {
        var it = state.selectedItems[idx];
        state.selectedItems.splice(idx, 1);
        if (state.selectedByCategory[it.categoryId]) {
            state.selectedByCategory[it.categoryId].count = Math.max(0, state.selectedByCategory[it.categoryId].count - 1);
        }
        updateCategoryCounter();
        renderDishes(state.currentCategory, null);
        renderSeleccionados();
    }

    // Confirma la categoría y reinicia el contador para nueva tanda
    $('#btnConfirmarCategoria').on('click', function () {
        if (!state.currentCategory) return;
        var catId = state.currentCategory;
        if (!state.selectedByCategory[catId]) state.selectedByCategory[catId] = { count: 0 };
        state.selectedByCategory[catId].count = 0;
        state.lockedCategories[catId] = false;
        updateCategoryCounter();
        renderDishes(catId, null);
        showAlert('success', 'Se han confirmado los platos de la categoría. Puedes seguir eligiendo.');
    });

    // Pasa al paso 4 (resumen) y lo renderiza
    $('#btnResumen').on('click', function () {
        goStep(4);
        var cont = $('#resumenContainer');
        cont.empty();
        var personasTxt = '<p>Personas: ' + state.personas + '</p>';
        var mesaTxt = '<p>Mesa: ' + state.mesa + '</p>';
        var buffetTxt = state.buffet ? '<p>Buffet: ' + state.buffet.name + ' (' + state.buffet.pricePerPerson + '€/persona)</p>' : '';
        cont.append(mesasTxtSafe(mesaTxt)).append(personasTxtSafe(personasTxt)).append(buffetTxtSafe(buffetTxt));
        var list = $('<ul class="list-group mt-2"></ul>');
        state.selectedItems.forEach(function (it) { list.append('<li class="list-group-item">' + it.name + ' - ' + it.ingredients.base.join(', ') + ' ' + (it.ingredients.extras.length ? ('+ ' + it.ingredients.extras.join(', ')) : '') + '</li>'); });
        cont.append(list);
    });

    // Helpers de render seguro
    function mesasTxtSafe(s) { return $(s); }
    function personasTxtSafe(s) { return $(s); }
    function buffetTxtSafe(s) { return $(s); }

    // Envía el pedido al backend y guarda respaldo local
    $('#btnEnviarPedido').on('click', function () {
        var payload = {
            mesa: state.mesa,
            personas: state.personas,
            buffetId: state.buffet ? state.buffet.id : null,
            total: state.buffet ? state.personas * state.buffet.pricePerPerson : 0,
            items: state.selectedItems
        };
        localStorage.setItem('ultimoPedido', JSON.stringify(payload));
        fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
            .then(function (r) { return r.ok ? r.json() : Promise.reject(r); })
            .then(function () { alert('Pedido enviado'); })
            .catch(function () { alert('No se pudo enviar. Guardado localmente.'); });
    });

    // Avanza del paso 1 al 2 si hay mesa y personas válidas
    $('#btnContinuar1').on('click', function () {
        var mesaVal = $('#mesaSelect').val();
        var perVal = parseInt($('#personasInput').val(), 10);
        if (!mesaVal || !perVal || perVal < 1) { showAlert('warning', 'Completa mesa y número de personas'); return; }
        state.mesa = mesaVal;
        state.personas = perVal;
        goStep(2);
        renderBuffets();
        fetch('/api/sessions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mesa: state.mesa, personas: state.personas }) });
    });

    // Selección de buffet: actualiza estado y total
    $('#buffetOptions').on('change', 'input[name="buffet"]', function () {
        var id = $(this).val();
        state.buffet = buffets.find(function (b) { return b.id === id; });
        updateBuffetTotal();
    });

    // Avanza del paso 2 al 3 tras elegir buffet
    $('#btnContinuar2').on('click', function () {
        if (!state.buffet) { showAlert('warning', 'Selecciona un buffet'); return; }
        goStep(3);
        renderCategories();
    });

    // Carga inicial del paso 1
    initMesaSelect();

    // Cambia la visibilidad de pantallas y resalta el paso activo
    function goStep(n) {
        state.currentStep = n;
        $('#step-1, #step-2, #step-3, #step-4').addClass('d-none');
        $('#step-' + n).removeClass('d-none');
        $('#pedidoStepsNav .step-pill').removeClass('active');
        $('#pedidoStepsNav .step-pill').each(function () {
            if ($(this).data('step') === n) $(this).addClass('active');
        });
    }

    // Muestra alerta temporal en el área de mensajes
    function showAlert(type, text) {
        var cont = $('#pedidoAlerts');
        var el = $('<div class="alert alert-' + type + '" role="alert"></div>');
        el.text(text);
        cont.empty().append(el);
        setTimeout(function () { el.fadeOut(300, function () { $(this).remove(); }); }, 3000);
    }

    // Notifica si alcanzó el límite de platos por categoría
    function maybeNotifyLimit(catId) {
        var limit = state.personas * 5;
        var count = (state.selectedByCategory[catId] ? state.selectedByCategory[catId].count : 0);
        if (count >= limit) showAlert('info', 'Has alcanzado el límite de la categoría. Confirma para reiniciar.');
    }
});
