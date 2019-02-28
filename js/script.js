var app = {
  score: 0,
  total: 12,
   Leftpos :[[10,133],[10,225],[10,315],[10,408],[10,486],[10,578]],
	Rightpos :[[250,135],[250,225],[250,315],[250,410],[250,487],[250,578]],
	
	 Leftpos1 :[[10,133],[10,225],[10,315],[10,408],[10,486],[10,578]],
	Rightpos1 :[[250,225],[250,135],[250,410],[250,315],[250,578],[250,487]],
	
  Ans:[2,1,4,3,6,5],
	check:[],
	point:[0,0],
  UserRes:[],
	
  DragX:[10,110,212,300,402,506],
  DragY:[15,15,15,15,15,15],
  
  DropX:[180,180,180,180,180,180],
  DropY:[-537.5,-445.5,-353.5,-264.5,-184.5,-100.5],
  
  Sequence:[0,1,2,3,4,5],
  
  ArrQ: [0,1,2,3,4,5],
  Attempt:false,
  
  init: function () {
    $('body').show();
    $('body').bind('contextmenu', function (e) {
      return false;
    });
			$('.left .box').click(function(e) {
			var val =$(e.target).attr('val');
			app.drawLine(val,'left')
		});
		$('.right .box').click(function(e) {
			var val =$(e.target).attr('val');
			app.drawLine(val,'right')
		})
    $('#score').hide();
    sound = document.getElementById("audio");
    sound1 = document.getElementById("audio1");
	sound3 = document.getElementById("audio2");
    this.BtnAD('check_ans', 'disabled');
    this.BtnAD('reset', 'enabled');
    this.BtnAD('see_ans', 'enabled');
	this.DragStart();

  },
  drawLine:function(v,key) {
		var c = app.check.indexOf(key);
		if(c == -1){
			app.check.push(key);
			if(key=='left'){
				app.point[0]=v;
			}else if(key == 'right'){
				app.point[1]=v;
			}
		}
          
		if(app.check.length == 2){
			var l= parseInt(app.point[0])-1;
			var r = parseInt(app.point[1])-1;
			 $("#l"+app.point[0]).css({'pointer-events':'none','background':'#999'}).attr('ans',app.point[1]);
             $("#r"+app.point[1]).css({'pointer-events':'none','background':'#999'});
             app.UserRes.push([app.point[0],app.point[1]]);
			   var svg =`<svg height="700" width="260">
				  <line x1="`+app.Leftpos[l][0]+`" y1="`+app.Leftpos[l][1]+`" x2="`+app.Rightpos[r][0]+`" y2="`+app.Rightpos[r][1]+`" style="stroke:rgb(255,0,0);stroke-width:2" />
				  Sorry, your browser does not support inline SVG.
				</svg>`;
				$('.pointbox').append(svg);

			app.check=[];
			app.point=[];
		}
    if(app.UserRes.length == 1){
       app.BtnAD('check_ans', 'enabled');
    }

	},
	mmcqFun: function(){
   if($("input[type=checkbox]:checked").length==6)
   {
    app.BtnAD('check_ans', 'enabled');
	}else{
	app.BtnAD('check_ans', 'enabled');
	}
 
}, 
  DragStart:function(){
   
    this.shuffle(app.Sequence);
    for (var i = 0; i <= app.Sequence.length-1; i++) {

	  $("#drags"+i).css({"left":app.DragX[app.Sequence[i]],'top':app.DragY[app.Sequence[i]]}).attr("dro","").attr('drag','false');
      $("#drops"+i).attr('data-ids','-1'); 

    }
     for (var i = 0; i <= app.DropX.length-1; i++) {
        $("#drops"+i).attr('data-ids','-1');
    }
  
    $('.draggable').draggable({revert:true,zIndex:999999,containment:"#main"});
    $('.droppable').droppable({drop:app.DropFun});
},
DropFun:function(event,ui){

//app.PlaySound();
		/*if(app.Attempt == true)
		{
			app.BtnAD('submit', 'disabled');
			app.BtnAD('see_ans', 'disabled');
			app.BtnAD('check_ans', 'enabled');	
		} */
		
    var drags = ui.draggable.attr('id');
    var drops = $(this).attr('id');
    if (ui.draggable.element !== undefined) {
    ui.draggable.element.droppable('enable');
    }
    ui.draggable.position({of: $(this),my: "center center",at:"center center"});
    ui.draggable.draggable('option', 'revert', "invalid");
    
    var data_id = ui.draggable.attr('data-id');
    var data_ids = $(this).attr('data-ids');
    var num = $(this).attr('num');
    var drag_status = ui.draggable.attr('drag');
    var dro = ui.draggable.attr('dro');
	

	
	

    if(drops != "dragBox"){
		//ui.draggable.addClass('trea');
		//ui.draggable.removeClass('drr');
		
        if(data_ids == -1 && (dro == "" || drag_status == 'false')){
            $("#"+drops).attr('data-ids',data_id);
            $("#drags"+data_id).attr('drag','true');
            $("#drags"+data_id).attr('dro', num);
			
        }else if(data_ids == -1 && drag_status == 'true'){
            $("#"+drops).attr('data-ids',data_id);
            $("#drops"+dro).attr('data-ids',"-1");
            $("#drags"+data_id).attr('drag','true');
            $("#drags"+data_id).attr('dro', num);
			
        }else if(data_ids != -1 && drag_status == 'false'){
            $("#"+drops).attr('data-ids',data_id);
            $("#drags"+data_id).attr('drag','true');
            $("#drags"+data_ids).animate({left:app.DragX[app.Sequence[data_ids]],top:app.DragY[app.Sequence[data_ids]]});
            $("#drags"+data_ids).attr('drag','false');
            $("#drags"+data_id).attr('dro', num);
			$("#drags"+data_ids).attr('dro', '');
			//ui.draggable.addClass('trea');
			//$("#drags"+data_ids).addClass('drr');
			//$("#drags"+data_ids).removeClass('trea');
			
			 
        }else if(data_ids != -1 && drag_status == 'true'){
            $("#"+drops).attr('data-ids',data_id);
            $("#drops"+dro).attr('data-ids',data_ids);
            $("#drags"+data_id).attr('drag','true');
            $("#drags"+data_ids).animate({left:app.DropX[dro],top:app.DropY[dro]});
            $("#drags"+data_id).attr('dro', num);
            $("#drags"+data_ids).attr('dro', dro);  
            //adj("drags"+data_id,drops);
        }
    }else{
        $("#drops"+dro).attr('data-ids',"-1");
        $("#drags"+data_id).attr('drag','false');
        $("#drags"+data_id).css({left:app.DragX[app.Sequence[data_id]],top:app.DragY[app.Sequence[data_id]]});
        $("#drags"+data_id).attr('dro', "");
		
		//ui.draggable.addClass('drr');
		//ui.draggable.removeClass('trea');
    }

   /*if($("#drags0").attr('dro')== "0"){
		app.PlaySound();
	}else if($("#drags1").attr('dro') == "1"){
		app.PlaySound();
	}else if($("#drags2").attr('dro') == "2"){
		app.PlaySound();
	}else if($("#drags3").attr('dro') == "3"){
		app.PlaySound();
	}else if($("#drags4").attr('dro') == "4"){
		app.PlaySound();
	}
	else{
	   app.PlaySound1();
	}*/
            sc=0;
            for (var i = 0; i < 6; i++) {
               var loc = $('#drags' + i).attr('dro');

                   if(loc == ""){
                    sc++;
                   }
                }
            if(sc ==0) {              
				 app.BtnAD('check_ans', 'enabled');
                }else{
				 app.BtnAD('check_ans', 'enabled');
				}
   } ,

  PlaySound:function() {
          
          sound.play();
      },
 PlaySound1:function() {
          sound1.play();
      },

 CheckFun: function () { 
   $('#dis').show(); 
    $('.r.w').show(); 
     app.Attempt = true; 
   $('#score').show();
   $.each(app.ArrQ, function (k, v) {
	
   if($('#drags' + k).attr('dro')!='')
	  {
      if ($('#drops' + k).attr('data-ids') == v) {
	  
        app.score++;
		$('#right'+k).show();
	     }else{
		$('#wrong'+k).show();
	  }
	  }
	  
    });
	
	    var Elements=$("input[type=checkbox]:checked");
  	$('.left .box').each(function(i,v){
      
      var lBox = parseInt($(v).attr('val'))-1;
      var rBox = parseInt($(v).attr('ans'));
	  if($(v).attr('ans')!=''){
  		if(app.Ans[lBox] == rBox){
  			app.score++;
	    $('#rightt'+i).show();
	    }else{
		$('#wrongg'+i).show();

      }
	  
  	}
		
  	 
  	});
	if(app.score ==12){
	  
	  $('#score').show();
	  
	  document.getElementById("audio").play();
	 
	}else{
	  $('#score').hide();
	  document.getElementById("audio1").play();
	}

   //$('#score').html('Score: ' + app.score + '/' + app.total);
    app.BtnAD('check_ans', 'disabled');
    app.BtnAD('see_ans', 'enabled');
  },
  
  SeeFun: function () {
	$('.r_w,.r_w1').hide();
       $('#score').hide();
	$('#dis').show();
    $('.draggable,#questions1,#questions2').fadeOut('slow');
    $('.dropp').fadeOut('slow', function () {
	
       $.each(app.DragX, function (k, v) {
       $("#drags"+k).css({"left":app.DragX[app.Sequence[k]],'top':app.DragY[app.Sequence[k]]});
     })
	 
        $.each(app.ArrQ, function (k, v) {
           $("#drags"+k).css({"left":app.DropX[k],'top':app.DropY[k]});
           $('.r_w,.r_w1').hide();
           $('.dropp,.draggable,#questions1,#questions2').fadeIn('slow');
		   
	  
	  
    });
    
      
    });
	$('#questions,#questions1, svg').fadeOut('slow', function () {
      $('svg').remove();
      var svg='';
      $.each(app.Ans,function(i,v){
        svg +=`<svg height="600" width="800">
            <line x1="`+app.Leftpos1[(v-1)][0]+`" y1="`+app.Leftpos1[(v-1)][1]+`" x2="`+app.Rightpos1[(v-1)][0]+`" y2="`+app.Rightpos1[(v-1)][1]+`" style="stroke:rgb(255,0,0);stroke-width:2" />
            Sorry, your browser does not support inline SVG.
          </svg>`;
      })
      
$('.pointbox').append(svg);
});
//$('svg').fadeIn('slow')
    app.BtnAD('see_ans', 'disabled');
    app.BtnAD('reset', 'enabled');
  },
  ResetFun: function () {
    $('svg').remove();
    $('#score').hide();
	app.shuffle(app.Sequence); 
	$('.box').css({'pointer-events':'auto','background':'red'}).attr('ans','');;
	 app.UserRes=[];
    $('.draggable').draggable('enable');
	 $.each(app.ArrQ, function (k, v) {
           $("#drags"+k).css({"left":app.DragX[k],'top':app.DragY[k]});
           $('.r_w,.r_w1').hide();
           $('.dropp, .draggable').fadeIn('slow');
       
    
    
    });

	app.DragStart();
    app.BtnAD('reset', 'enabled');
	app.BtnAD('see_ans', 'enabled');
    app.score = 0;
	//$('#score').html('Score: ' + app.score + '/' + app.total);	
	   
    $('#dis').hide();
    //$('.r_w').remove();

	   app.HideWr();
	   app.HideWr1();
  },
    shuffle: function (o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  },
  
 HideWr: function() {
    for (var i = 0; i < 14; i++) {
    $('#right' + i).hide();
    $('#wrong' + i).hide();	
  }
}, 
 HideWr1: function() {
    for (var i = 0; i < 14; i++) {
    $('#rightt' + i).hide();
    $('#wrongg' + i).hide();	
  }
}, 

shuffle: function (o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
},
  
  BtnAD: function (btn_name, btn_stage) {
    if (btn_stage == 'enabled') {
      $('#' + btn_name).addClass('btn');
      $('#' + btn_name).removeClass('btn_d');
    } else if (btn_stage == 'disabled') {
      $('#' + btn_name).addClass('btn_d');
      $('#' + btn_name).removeClass('btn');
    }
  }
}
$(window).load(function () {
  app.init();

   
});
