"use strict";var initialColumns='<div class="horarios" data-list="horario"><ul class="list-horarios no-bullet" data-reserva="container-horario"><li data-reserva="celula-horario" class="li">01:00</li></ul></div>',initialRows='<div class="dias-reservas"><div class="button-scroll-prev" data-scroll="prev">&lsaquo;</div><div class="button-scroll-next" data-scroll="next">&rsaquo;</div><ul class="dias-list no-bullet" data-tabela="dias"><li class="li" data-tabela="dias-mes"><strong class="data">11/11/11</strong><span class="dia">Quarta-feira</span></li></ul><div class="block-reservas" data-list="vagas"><ul class="reservas-list no-bullet" data-list="celulas-reserva"><li class="li" data-tabela="reserva"><ul data-reserva="reserva-horario" class="reserva-horario"><li data-reserva="celula-vaga" class="li"></li></ul></li></ul></div></div>',initialElements=initialColumns+initialRows;$('[data-scroll="table"]').append(initialElements),!function(a,e){a.empty();for(var t=agenda.config.rowInside.indexOf("hour")?parseInt(agenda.config.hourRowStart):0;t<(agenda.config.rowInside.indexOf("hour")?parseInt(agenda.config.hourRowEnd):agenda.config.rows);t++){var s=e.clone();switch(agenda.config.rowInside){case"full-hour":var r=t+"h";r=10>t?"0"+r:r,s.html(r);break;case"half-hour":s=[];for(var l=0;2>l;l++){var i=e.clone(),n=t+"h";n=10>t?"0"+n:n,n=l?n+"30min":n+"00min",i.html(n),s.push(i)}break;case"number":s.html(t+1);break;case"letter":s.html(String.fromCharCode(97+t));break;default:s.html(t)}a.append(s)}}($('[data-reserva="container-horario"]'),$('[data-reserva="celula-horario"]')),!function(a,e){a.empty();for(var t=0;t<agenda.config.cols;t++){var s=e.clone();switch(agenda.config.colInside){case"hour":var r=t+"h";r=10>t?"0"+r:r,s.find(".data").html(r),s.find(".dia").empty();break;case"number":s.find(".data").html(t+1),s.find(".dia").empty();break;case"letter":s.find(".data").html(String.fromCharCode(97+t)),s.find(".dia").empty();break;case"date":var l=new Date(agenda.config.dateColStart);l.setDate(l.getDate()+(t+1));var i=l.getDate(),n=l.getMonth()+1,d=String(l.getFullYear()).substring(2,4),o=i+"/"+n+"/"+d;s.find(".data").html(o),s.find(".dia").html(agenda.config.weekDays[l.getDay()]);break;default:s.html(t)}a.append(s)}}($('[data-tabela="dias"]'),$('[data-tabela="dias-mes"]')),!function(a,e,t){a.empty();for(var s=0;s<agenda.config.cols;s++){var r=t.clone(),l=r.find('[data-reserva="reserva-horario"]'),i=r.find('[data-reserva="celula-vaga"]');r.empty(),l.empty();for(var n=0;n<=(agenda.config.rowInside.indexOf("hour")?agenda.config.rowInside.indexOf("half")?agenda.config.rows-1:2*agenda.config.rows-1:agenda.config.rows);n++){var d=i.clone();d.attr("data-disponibilidade",1);for(var o=0;o<agenda.config.occupedCells.length;o++){var c=agenda.config.occupedCells[o],f=parseInt(c.split("x")[0]),v=parseInt(c.split("x")[1]);s+1==v&&n+1==f&&d.attr("data-disponibilidade",2)}for(var o=0;o<agenda.config.blockedCells.length;o++){var u=agenda.config.blockedCells[o],h=parseInt(u.split("x")[0]),p=parseInt(u.split("x")[1]);s+1==p&&n+1==h&&d.attr("data-disponibilidade",3)}for(var o=0;o<agenda.config.promoCells.length;o++){var g=agenda.config.promoCells[o],b=parseInt(g.split("x")[0]),$=parseInt(g.split("x")[1]);s+1==$&&n+1==b&&d.addClass("fa fa-tags")}l.append(d)}r.append(l),a.append(r)}}($('[data-list="celulas-reserva"]'),$('[data-tabela="reserva"]'),$('[data-tabela="reserva"]')),$(window).on("load resize",function(){parseInt($('[data-tabela="dias-mes"]').css("width"));$('[data-tabela="dias-mes"] , [data-tabela="reserva"]').css("position","absolute"),$('[data-tabela="dias"]').css({width:"100%",overflow:"hidden"});var a=parseInt($('[data-tabela="dias-mes"]').css("width"));$('[data-tabela="dias-mes"]').each(function(e,t){var s=e*a;$(t).css({left:s,"z-index":e++})}),$('[data-tabela="reserva"]').each(function(e,t){var s=e*a;$(t).css({left:s,"z-index":e++})}),$('[data-list="horario"]').scroll(function(){$('[data-list="vagas"]').scrollTop($('[data-list="horario"]').scrollTop())});var e=parseInt($('[data-tabela="reserva"]:nth-child( 4 )').css("left")),t=parseInt($('[data-tabela="reserva"]:last').css("left")),s=parseInt($('[data-tabela="reserva"]:first').css("width"));$('[data-scroll="next"]').on("click",function(){var t=parseInt($('[data-tabela="reserva"]:first').css("left")),r=parseInt($('[data-tabela="reserva"]:last').css("left"));r>e&&($('[data-tabela="reserva"] ').each(function(e,t){var s=parseInt($(t).css("left"))-a;$(t).animate({left:s},"slow")}),$('[data-tabela="dias-mes"] ').each(function(e,t){var s=parseInt($(t).css("left"))-a;$(t).animate({left:s},"slow")})),-t-s==0?$(this).css({opacity:.6,cursor:"default"}):$('[data-scroll="prev"]').css({opacity:1,cursor:"pointer"})}),$('[data-scroll="prev"]').on("click",function(){var e=parseInt($('[data-tabela="reserva"]:first').css("left")),r=parseInt($('[data-tabela="reserva"]:last').css("left"));t>r&&($('[data-tabela="reserva"] ').each(function(e,t){var s=parseInt($(t).css("left"))+a;$(t).animate({left:s},"slow")}),$('[data-tabela="dias-mes"] ').each(function(e,t){var s=parseInt($(t).css("left"))+a;$(t).animate({left:s},"slow")})),-e-s==0?$(this).css({opacity:.6,cursor:"default"}):$('[data-scroll="next"]').css({opacity:1,cursor:"pointer"})}),window.innerWidth<750?$('[data-reserva="reserva-horario"]').each(function(a,e){$(e).find('[data-reserva="celula-vaga"]').each(function(a,e){$(e).html($('[data-reserva="celula-horario"]:nth-child('+(a+1)+")").html())})}):$('[data-reserva="reserva-horario"]').each(function(a,e){$(e).find('[data-reserva="celula-vaga"]').each(function(a,e){$(e).html("&nbsp;")})}),agenda.config.clickable?$('[data-reserva="celula-vaga"]').unbind("click").bind("click",function(){var a=parseInt($(this).attr("data-disponibilidade"))+1;a=a>3?1:a,$(this).attr("data-disponibilidade",a)}):$('[data-reserva="celula-vaga"]').css("cursor","default"),"visible"!=$('[data-scroll="table"]').css("visibility")&&$('[data-scroll="table"]').css("visibility","visible")});