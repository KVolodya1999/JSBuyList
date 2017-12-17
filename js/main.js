$(function(){
    //Змінні, що відповідають за місце, куди ми будемо додавати продукти(нові, запропоновані +, або відмічені купленими
    var $allProducts = $(".allProducts");
    var $boughtProducts1 = $(".boughtProducts1");
    var $boughtProducts2 = $(".boughtProducts2");

    //макет одного продукту у першій та другій колонках
    var $productInFirstPanel= $(".productInFirstPanel").html();
    var $productInSecondPanel= $(".productInSecondPanel").html();

    function addItem(title) {
        title=title.trim();
        if(!title)return;

        var node = $($productInFirstPanel); //Create new HTML node
        var node2 = $($productInSecondPanel); //Create new HTML node for second panel

        node.find(".bl-product").text(title); //Set product title
        node.find(".bl-label").text("1");
        node2.find('.notBoughtProductSpan').text(title);
        node2.find('.amount-of-products-Lebel').text();

        var amount = 1;
        node.find(".bl-minus").attr("disabled","");

        node.find(".bl-plus").click(function () {
            node.find(".bl-minus").removeAttr("disabled");
            amount+=1;
            node.find('.bl-label').text(amount);
            node2.find(".amount-of-products-Lebel b i").text(amount);
        });
        node.find(".bl-minus").click(function () {
            amount-=1;
            if(amount==1)node.find(".bl-minus").attr("disabled","");
            node.find('.bl-label').text(amount);
            node2.find(".amount-of-products-Lebel b i").text(amount);
        });

        //Delete Action
        node.find(".buttonRemove").click(function(){
            node.slideUp('slow', function(){
                node.remove();
                node2.remove();
            });
        });

        node.find('.boughtButton').click(function(){
            if(node.find('.boughtButton i').text()=="Куплено"){
                node2.remove();
                node2.find('.notBoughtProductSpan').addClass('line-through');
                node2.find('.amount-of-products-Lebel').addClass('line-through');
                $boughtProducts2.append(node2);

                node.find('.bl-product').addClass('line-through');
                node.find('.bl-minus').hide();
                node.find('.bl-plus').hide();
                node.find('.buttonRemove').hide();
                node.find('.boughtButton i').text("Не куплено");
            }

            else {
                node2.remove();
                node2.find('.notBoughtProductSpan').removeClass('line-through');
                node2.find('.amount-of-products-Lebel').removeClass('line-through');
                $boughtProducts1.append(node2);

                node.find('.bl-product').removeClass('line-through');
                node.find('.bl-minus').show();
                node.find('.bl-plus').show();
                node.find('.buttonRemove').show();
                node.find('.boughtButton i').text("Куплено");
            }
        });

        $(node.find('.bl-product')).keydown(function (e) {
            if(event.keyCode==13) {
                $(this).blur();
            }
        });

        $(node.find('.bl-product')).focusout(function () {
            if(!$(this).text()) $(this).text("Без назви");
            node2.find('.notBoughtProductSpan').text($(this).text());
        });


        $allProducts.append(node); //Add to the end of the list
        $boughtProducts1.append(node2);//додаєм одразу у другу панель
    }

    $(".button").click(function () {
        addItem(($('.input')).val());
        ($('.input')).val("");
        ($('.input')).focus();
    });

    addItem("Огірки");
    addItem("Картопля");
    addItem("Цибуля");


});