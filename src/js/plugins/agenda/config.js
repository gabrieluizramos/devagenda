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
				event.stopImmediatePropagation();
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
				event.stopImmediatePropagation();
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