$(function(){
// 职位代码筛选
    var professional_include = function(item, target) {
        if(target.indexOf(item) != -1) {
            return true
        } else {
            return false
        }
    }
// 渲染模板函数
function templateDo(jsonData ,num) {
    if(jsonData.length == 0) {
        var htmls = '<p class="result_tip">没有匹配的数据，请重新修改条件查询，或点击不限专业开关，查看更多职位！</p>';
    } else {
        var htmls = '<table class="my_table table">\
                  <tr>\
                      <th class="th1">报考部门</th>\
                      <th class="th2">职位代码</th>\
                      <th class="th3">分数</th>\
                      <th class="th4">排名</th>\
                  </tr>';
        for(var j in jsonData) {
            var obj = jsonData[j];
            var j = j-0+1;
            console.log(j);
            htmls += '<tr data_index=' + obj.data_index + '>'
            htmls += '<td>' + obj.item01 + '</td>';
            htmls += '<td>' + obj.item02 + '</td>';
            htmls += '<td>' + obj.item03 + '</td>';
            htmls += '<td>' + j + '</td>';
            htmls += '</tr>'
        }
        htmls += '</table>';
    }
    $('.dataSystem').html(num.length);
    $('.table_scroll').html('').append(htmls);
}

var clickfn = function() {
    var num = [];
    var array = [];
    var zwdm = $('.zwdm').val()
    if(zwdm == ""){
            alert('职位代码不能为空！')
            return false;
    }
    $.each(datalist, function(idx, obj) {
            if(professional_include(zwdm, obj.item02.toString())){
                obj.data_index = idx;
                num.push(obj.data_index);
                array.push(obj);
            }
    });
    if(array.length == 0){
        alert('请填写正确的职位代码！')
        return false;
    }else {
        $(".table_wrap").fadeIn()
        $(".cover").fadeIn()
        // 分数排序
        function sortId(a,b){
            return b.item03-a.item03
        }
        array.sort(sortId);
        // console.log(array);
        templateDo(array,num);
    }
}
    $(".tj").click(function(){
        if (Cookies.get('isLogin') != "yes") {
            $(".cover").show()
            $("#loginAndReg").show()
            $(".table_wrap").hide()
        }else {
            $(".cover").hide()
            $("#loginAndReg").hide()
            $(".table_wrap").show()
            clickfn();
        }
    })
})