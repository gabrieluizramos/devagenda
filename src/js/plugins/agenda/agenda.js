	// insere configurações baseadas no json agenda
	// colunas iniciais
    var initialColumns 	=	''
    +'<div class="horarios" data-list="horario">'
		+'<ul class="list-horarios no-bullet" data-reserva="container-horario">'
			+'<li data-reserva="celula-horario" class="li">01:00</li>'
		+'</ul>'
    +'</div>'
	// celula padrao
	var initialRows 	= '' 		
			+'<div class="dias-reservas">'
			+'<div class="button-scroll-prev" data-scroll="prev">&lsaquo;</div>'
			+'<div class="button-scroll-next" data-scroll="next">&rsaquo;</div>'
			+'<ul class="dias-list no-bullet" data-tabela="dias">'
				+'<li class="li" data-tabela="dias-mes">'
					+'<strong class="data">11/11/11</strong>'
					+'<span class="dia">Quarta-feira</span>'
				+'</li>'
			+'</ul>'
			+'<div class="block-reservas" data-list="vagas">'
				+'<ul class="reservas-list no-bullet" data-list="celulas-reserva">'
					+'<li class="li" data-tabela="reserva">'
						+'<ul data-reserva="reserva-horario" class="reserva-horario">'
							+'<li data-reserva="celula-vaga" class="li"></li>'
						+'</ul>'
					+'</li>'
				+'</ul>'
			+'</div>'
		+'</div>';
	//seta iniciais 
	var initialElements = initialColumns + initialRows;
	// insere initials
	$( '[data-scroll="table"]' ).append( initialElements );
	// insere linhas
	!function( target , modelElement ){
		target.empty();
		for (var i = 0; i < agenda.config.rows; i++) {
			var newElement = modelElement.clone();
			switch ( agenda.config.rowInside ) {
				case 'hour':
					var hour = i + 'h';
					hour = ( i < 10 ) ? '0'+hour : hour;
					newElement.html( hour );
					break;
				case 'number':
					newElement.html( i + 1 );
					break;
				case 'letter' :
					newElement.html( String.fromCharCode( 97 + i ) );
					break;
				default:
					newElement.html( i );
			} 
			target.append( newElement );
		}
	}( $( '[data-reserva="container-horario"]' ) , $( '[data-reserva="celula-horario"]' ) );
	// insere colunas
	!function( target , modelElement ){
		target.empty();
		for (var i = 0; i < agenda.config.cols; i++) {
			var newElement = modelElement.clone();
			switch ( agenda.config.colInside ) {
				case 'hour':
					var hour = i + 'h';
					hour = ( i < 10 ) ? '0'+hour : hour;
					newElement.find( '.data' ).html( hour );
					newElement.find( '.dia' ).empty();
					break;
				case 'number':
					newElement.find( '.data' ).html( i + 1 );
					newElement.find( '.dia' ).empty();
					break;
				case 'letter' :
					newElement.find( '.data' ).html( String.fromCharCode( 97 + i ) );
					newElement.find( '.dia' ).empty();
					break;
				case 'date' :
					var date = new Date( agenda.config.dateColStart );
					date.setDate( date.getDate() + ( i + 1 ) );
					day = date.getDate();
					month = ( date.getMonth() + 1 );
					year = String( date.getFullYear() ).substring( 2 , 4 );
					cellDate = day + '/' + month + '/' + year;
					newElement.find( '.data' ).html( cellDate );
					newElement.find( '.dia' ).html( agenda.config.weekDays[ date.getDay() ] );
					break;
				default:
					newElement.html( i );
			} 
			target.append( newElement );
		}
	}( $( '[data-tabela="dias"]' ) , $( '[data-tabela="dias-mes"]' ) );
	// insere celulas
	!function( target , modelContainer , modelElement ){
		target.empty();
		for (var i = 0; i < agenda.config.cols; i++) {
			var element = modelElement.clone();
			var cellList = element.find( '[data-reserva="reserva-horario"]' );
			var cell = element.find( '[data-reserva="celula-vaga"]' );
			element.empty();
			cellList.empty();
				for (var j = 0; j < agenda.config.rows; j++) {
					newCell = cell.clone();
					for (var k = 0; k < agenda.config.occupedCells.length ; k++) {
						var occupedCell = agenda.config.occupedCells[ k ];
						var occupedRow = parseInt( occupedCell.split( 'x' )[0] );
						var occupedCol = parseInt( occupedCell.split( 'x' )[1] );
						if ( ( ( i + 1 ) == occupedCol ) && ( ( j + 1 ) == occupedRow ) ) {
							newCell.addClass( 'vago' );
						}
					}
					cellList.append( newCell );					
				}
			element.append( cellList );
			target.append( element );
		}
	}( $( '[data-list="celulas-reserva"]' ) , $( '[data-tabela="reserva"]' ) , $( '[data-tabela="reserva"]' ) );
	// inicia o plugin apos as setar as configuracoes
	$( window ).on( 'load resize' , function(){
			 /* var diasMes = $( '[data-tabela="dias-mes"]' ).length;
			 $( '[data-tabela="dias"]' ).css( 'width' , 'calc( ( 100% * '+ diasMes +' * 4 ) + 1px )' ); */

			 var larguraTotal = parseInt( $( '[data-tabela="dias-mes"]' ).css( 'width' ) );

			 $( '[data-tabela="dias-mes"] , [data-tabela="reserva"]' ).css( 'position' , 'absolute' );
			 $( '[data-tabela="dias"]' ).css( { 'width' : '100%' , 'overflow' : 'hidden' } );

			 var larguraReferencia = parseInt( $( '[data-tabela="dias-mes"]' ).css( 'width' ) );

			 $( '[data-tabela="dias-mes"]' ).each(function( index , el ){
			 	var margemEsquerda = ( index * larguraReferencia );
			 	$( el ).css({
			 		'left' : margemEsquerda ,
			 		'z-index' : index++
			 	});
			 });
			 $( '[data-tabela="reserva"]' ).each(function( index , el ){
			 	var margemEsquerda = ( index * larguraReferencia );
			 	$( el ).css({
			 		'left' : margemEsquerda ,
			 		'z-index' : index++
			 	});
			 });
			/*alturaReferencia = $( '[data-tabela="reserva"]:first' ).css( 'height' );
			$( '[data-tabela="bloco-reservas"]' ).css( 'height' , alturaReferencia );*/
			$( '[data-list="horario"]' ).scroll(function(){
				$( '[data-list="vagas"]' ).scrollTop( $( '[data-list="horario"]' ).scrollTop() );
			});
			// next
			var ultimoDiaLinha = parseInt( $( '[data-tabela="reserva"]:nth-child( 4 )' ).css( 'left' ) );
			var ultimoLast = parseInt( $( '[data-tabela="reserva"]:last' ).css( 'left' ) );
			var larguraDia = parseInt( $( '[data-tabela="reserva"]:first' ).css( 'width' ) );
			$( '[data-scroll="next"]' ).on( 'click' , function(){
				var primeiroFirst = parseInt( $( '[data-tabela="reserva"]:first' ).css( 'left' ) );
				// event.stopImmediatePropagation();
				var ultimoDia = parseInt( $( '[data-tabela="reserva"]:last' ).css( 'left' ) );
				if ( ultimoDia > ultimoDiaLinha ) {
					$( '[data-tabela="reserva"] ' ).each( function( index , el ){
						var margemEsquerda = parseInt( $( el ).css('left') ) - larguraReferencia;
						$( el ).animate( { 'left' : margemEsquerda } , 'slow' );
					}); 
					$( '[data-tabela="dias-mes"] ' ).each( function( index , el ){
						var margemEsquerda = parseInt( $( el ).css('left') ) - larguraReferencia;
						$( el ).animate( { 'left' : margemEsquerda } , 'slow' );
					});
				}
				// coloca opacidade e tira cursor caso seja ultimo
				if ( (-( primeiroFirst ) - ( larguraDia ) ) == 0 ) {
					$( this ).css({
						'opacity' 	: 	0.6	,
						'cursor' 	: 	'default'
					});
				}
				else{
					$( '[data-scroll="prev"]' ).css({
						'opacity' 	: 	1	,
						'cursor' 	: 	'pointer'
					});
				}				
			});
			// prev
			$( '[data-scroll="prev"]' ).on( 'click' , function(){
				var primeiroFirst = parseInt( $( '[data-tabela="reserva"]:first' ).css( 'left' ) );
				// event.stopImmediatePropagation();
				var ultimoDia = parseInt( $( '[data-tabela="reserva"]:last' ).css( 'left' ) );
				if ( ultimoDia < ultimoLast  ) {
					$( '[data-tabela="reserva"] ' ).each( function( index , el ){
						var margemEsquerda = parseInt( $( el ).css('left') ) + larguraReferencia;
						$( el ).animate( { 'left' : margemEsquerda } , 'slow' );
					}); 
					$( '[data-tabela="dias-mes"] ' ).each( function( index , el ){
						var margemEsquerda = parseInt( $( el ).css('left') ) + larguraReferencia;
						$( el ).animate( { 'left' : margemEsquerda } , 'slow' );
					}); 
				}
				// coloca opacidade e tira cursor caso seja primeiro
				if ( (-( primeiroFirst ) - ( larguraDia ) ) == 0 ) {
					$( this ).css({
						'opacity' 	: 	0.6	,
						'cursor' 	: 	'default'
					});
				}
				else{
					$( '[data-scroll="next"]' ).css({
						'opacity' 	: 	1	,
						'cursor' 	: 	'pointer'
					});
				}	
			});

			if ( window.innerWidth < 750 ) {
				$( '[data-reserva="reserva-horario"]' ).each(function( idx , el ){
					$( el ).find( '[data-reserva="celula-vaga"]' ).each( function( index , element ){
						$( element ).html( $( '[data-reserva="celula-horario"]:nth-child('+ (index + 1) +')' ).html() );
					});
				});
			}
			else{
				$( '[data-reserva="reserva-horario"]' ).each(function( idx , el ){
					$( el ).find( '[data-reserva="celula-vaga"]' ).each( function( index , element ){
						$( element ).html( '&nbsp;' );
					});
				});
			}
		});