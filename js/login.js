function $id(ele){
	return document.getElementById(ele)
}
function $class(ele){
	return document.getElementsByClassName(ele)[0]
}
// 准考证号筛选
    var zkz_include = function(item, target) {
        if(target.indexOf(item) != -1) {
            return true
        } else {
            return false
        }
    }

$("#login_btn").click(function(){  //点击登录按钮
	$class("cover").style.display="block"
	$id("loginAndReg").style.display="block"
})
$("#reg_btn").click(function(){  //点击注册按钮
	$class("cover").style.display="block"
	$id("loginAndReg").style.display="block"
})
$(".bd_close").click(function(){  //点击叉号
	$class("cover").style.display="none"
	$id("loginAndReg").style.display="none"
})
$("#login_nav").click(function(){  //点击登录
	$id("login_con").style.display="block"  //登录块显示
	$id("reg_con").style.display="none"  //注册块隐藏
	$id("login_con").className="current"  //登录块给样式
	$id("login_nav").className="current"  //登录上方给样式
	$id("reg_nav").className=""  //清除注册块上方类名
})
$("#reg_nav").click(function(){  //与登录类似
	$id("reg_con").style.display="block"
	$id("login_con").style.display="none"
	$id("reg_con").className="current"
	$id("reg_nav").className="current"
	$id("login_nav").className=""
})
//登录
$("#denglu").click(function(){
	var success=1;
	var formid = $("#dlformid").val();
	var username = $("#loginName").val();
	Myphone = $("#loginPhone").val();
	if(username==''){   //验证手机号是否为空
		alert('请填写用户名');
		return false;
	}
	if(Myphone==''){   //验证手机号是否为空
		alert('请填写手机号');
		return false;
	}
	var reg=/^0?1[3456789]\d{9}$/; //手机号正则
	if(!reg.test(Myphone)){   //验证手机号是否正确
		alert('请填写正确的手机号!');
		return false;
	}
	$.getJSON("http://bj.offcn.com/index.php?m=formguide&c=index&a=formlogin&type=login&formid="+formid+"&username="+username+"&mobile="+Myphone+"&callback=?",function(json){
		if(json.status==1){
			success=2;
			alert("登录成功");
			$('.cover').hide();
            $('#loginAndReg').hide();
            Cookies.set('isLogin', 'yes');
            $("#my_videos").show();
            $("#videoBtn").hide();
            submitswitch=true;
		}else{
			alert("请先注册,再登录");
			$id("reg_con").style.display="block"
			$id("login_con").style.display="none"
			$id("reg_con").className="current"
			$id("reg_nav").className="current"
			$id("login_nav").className=""
		}
	})
})
$("#zhuce").click(function(){
	var formid = $("#zcformid").val();
	var username = $("#username").val();
	var Myphone = $("#phone").val();
	var yzm = $("#yzm").val();
	var ds = $(".province").val();
	var zkz = $("#zkz").val();
	var zkzattr = [];
	//alert(username);alert(Myphone);alert(yzm);
	if(username==''){   //验证手机号是否为空
		alert('请填写用户名');
		return false;
	}
	if(Myphone==''){   //验证手机号是否为空
		alert('请填写手机号');
		return false;
	}
	var reg=/^0?1[3456789]\d{9}$/;  //手机号正则
	if(!reg.test(Myphone)){   //验证手机号是否正确
		alert('请填写正确的手机号!');
		return false;
	}
	if(yzm == '') { 
		alert('请填写验证码');
		return false;
	}
	if(zkz == '') {
		alert('请填准考证号');
		return false;
	}
	var zkzreg = /\d{12}/;
	if(!zkzreg.test(zkz)) {
		alert('准考证号为12位');
		return false;
	}
	$.each(datalist, function(idx, obj) {
            if(zkz_include(zkz, obj.item04.toString())){
				zkzattr.push(obj);
            }
    });
    if(zkzattr.length == 0) {
    	alert('请输入正确的准考证号')
        return false;
    }else {
    	$.getJSON("http://bj.offcn.com/index.php?m=formguide&c=index&a=formlogin&type=zhuce&formid="+formid+"&username="+username+"&mobile="+Myphone+"&yzm="+yzm+"&zkz="+ zkz + "&callback=?",function(json){
				if(json.status==1){
					alert("注册成功");
					$('.cover').hide();
		            $('#loginAndReg').hide();
		            Cookies.set('isLogin', 'yes');
		            $("#my_videos").show();
		            $("#videoBtn").hide();
		            submitswitch=true;
				}else if(json.status==3){
					alert("验证码错误");
				}else{
					alert("已注册或注册失败");
				}
		})
    }
})
//获取验证码
$('#getyzm').click(function(){
	var formid = $(this).attr("data");
	var Myphone=$('#phone').val();
	if(Myphone==''){   //验证手机号是否为空
		alert('请填写手机号');
		return false;
		}
	var reg=/^0?1[3456789]\d{9}$/; //手机号正则
	if(!reg.test(Myphone)){   //验证手机号是否正确
		alert('请填写正确的手机号!');
		return false;
		}
	$('#getyzm').hide();
	$('#daojishi').show();
	$.getJSON("http://bj.offcn.com/index.php?m=formguide&c=index&a=formyzm&formid="+formid+"&mobile="+Myphone+"&callback=?",function(json){
		if(json.status==1){
			alert('正在发送验证码');
		    //倒计时
			runcount(120);
		}else if(json.status==2){
			alert('您已注册,去登陆吧');
			$('#getyzm').show(0);
			$('#daojishi').hide(0);
			// $('.container').find('.agileits').hide().eq(0).show();
			// $('.bd_nav').find('span').removeClass('active').eq(0).addClass('active');
			return false;
		}	
	})
});
//倒计时函数
function runcount(t){
	if(t>0){
		document.getElementById('daojishi').innerHTML=t+'S后重新获取';
		t--;
		setTimeout(function(){
			runcount(t)
			},1000)
	}else{
	    $('#getyzm').show();
	    $('#daojishi').hide();
	}
}