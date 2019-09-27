// window.onload=function(){
//     console.log('1. call listing function');
//     listing();
// }

$(document).ready(function(){
    // $('#orders-table').html('');
    listing();
    console.log('1. call listing function');
});

function listing(){
    // let item = "허니서클 앤 다바나 코롱";
    console.log('2. start listing function');
    let item = '향수';
    console.log('3. ' + item);
    $.ajax({
        type: "GET",
        url: "http://spartacodingclub.shop/order?item_give="+item,
        data: {},
        success: function(response){
            if(response['result'] == 'success'){
                let orders = response['orders'];
                for (let i = 0; i < orders.length; i++){
                    make_table(orders[i]['address'], orders[i]['count'], orders[i]['item'], orders[i]['name'], orders[i]['phone']);
                    console.log(orders[i]['address'], orders[i]['count'], orders[i]['item'], orders[i]['name'], orders[i]['phone']);
                }
            } else {
                alert('주문 목록을 가져오지 못했습니다.');
            }
        }
    })
}

function make_table(address, count, item, name, phone){
    let table_html = '\
    <tr>\
        <td>'+item+'</td>\
        <td>'+name+'</td>\
        <td>'+count+'개</td>\
        <td>'+address+'</td>\
        <td>'+phone+'</td>\
        </tr>';
        
    $('#orders-table').append(table_html);
    console.log('테이블 추가 성공');
}
    
function order() {
    let name = $('#order_name').val();
    let count = $('#order_count').val();
    let address = $('#order_address').val();
    let phone = $('#order_phone').val();
    // let item = "허니서클 앤 다바나 코롱";
    let item = '향수';

    $.ajax({
        type: "POST",
        url: "http://spartacodingclub.shop/order",
        data: {
            name_give:name,
            count_give:count,
            address_give:address,
            phone_give:phone,
            item_give:item
        },
        success: function(response){
            if (response['result'] == 'success'){
                alert('주문 완료!');
                console.log('주문 완료!');
                window.location.reload();
            }
        }
    })
}