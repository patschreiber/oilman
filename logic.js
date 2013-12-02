$(document).ready(function() {
  var money = 0;
  var level = 1;
  var exchangeRate = 1;
  var multiplier = 1;
  var tickRate = 1000;
  var multiplierCost = 10;
  var rateCost = 5;
  var moneyMasteryCost = 1000000;

  var oil = 0;
  var oilRate = 5000;
  var oilMultiplier = 1;
  var oilMultiplierCost = 15000;
  var oilValue = 1;
  var oilValueCost = 5000;
  var currentDebt = 10000000;
  var oilMasteryCost = 5000000;

  var ticker = setInterval(function() {
    money = money + (1 * multiplier);
    update();
  },tickRate);


  $('.deed-toggle').click(function() {
    $('.deed').slideToggle("slow");
  });

  //FIRST COLUMN START

  $('#rate').click(function() {

    console.log(money);
    if (money >= rateCost) {
      money = money - Math.ceil(rateCost);
      $('.money').text( money );

      tickRate = getTickRate(tickRate);
      
      console.log(tickRate);
      clearInterval(ticker);
      rateCost = rateCost * 1.5
      $('.rateCost').text( Math.ceil(rateCost) );
      ticker = setInterval(function() {
        money = money + (1 * multiplier);
        update();
      },tickRate);
    }
  });

  $('#multiplier').click(function() {
    if (money >= multiplierCost) {
      money = money - multiplierCost;
      $('.money').text(money);
      multiplier = multiplier + 2;
      clearInterval(ticker);
      multiplierCost = multiplierCost + Math.ceil((multiplierCost / 2) + 10);
      $('.multiplierCost').text(Math.ceil(multiplierCost).toFixed(2));
      ticker = setInterval(function() {
        money = money + (1 * multiplier);
        update();
      },tickRate);
    }
  });

  $('#moneyMastery').click(function() {
    if(money >= moneyMasteryCost) {
      money = money - moneyMasteryCost;
    }
    $('.trophyCase').append('<p class="label label-success">Master of Money</p>');
    $('#moneyMastery').hide();
  });


  $('#mine').click(function() {
    var convertedMoney = Math.floor((oil * oilValue) * exchangeRate);
    money = money + convertedMoney;
    oil = 0;
    $('.oil').text(oil);
  });



  //-------------------------------------------------------


  //SECOND COLUMN START

  var oilTicker = setInterval(function() {
    oil = oil + (10 * oilMultiplier);
    updateOil();
  },oilRate);


  $('#oilMultiplier').click(function() {
    if (money >= oilMultiplierCost) {
      money = money - oilMultiplierCost;
      oilMultiplier = oilMultiplier + 1;
      oilMultiplierCost = oilMultiplierCost + (Math.ceil(2000 + (oilMultiplierCost * 0.05)));
      $('.oilMultiplierCost').text( Math.ceil(oilMultiplierCost) );
    }
  });

  $('#oilValue').click(function() {
    if (money >= oilValueCost) {
      money = money - oilValueCost;
      oilValue = oilValue + 20;
      oilValueCost  = oilValueCost + (Math.ceil(1000 + (oilValueCost * 0.05)));
      $('.oilValueCost').text( Math.ceil(oilValueCost) );
    }
  });

  $('#oilMastery').click(function() {
    if(money >= oilMasteryCost) {
      money = money - oilMasteryCost;
    }

    $('.trophyCase').append('<p class="label label-success">Oil Man</p>');
    $('#oilMastery').hide();
  });


  //-------------------------------------------------------

  $('#pay').click(function() {
    if(currentDebt >= oil) {
      currentDebt = currentDebt - oil;
    }
    else {
      currentDebt = 0;
    }
    oil = 0;
    $('.oil').text(oil);
    $('.debtOwed').text( currentDebt );

    if(currentDebt <= 0) {
      alert("You Win! The oil fields are legally yours!");
      $('#pay').hide();
    }
  });


  function update() {
    $('.money').text(money);
  }

  function updateOil() {
    $('.oil').text(oil);
    calculateOilLoss();
    exchangeRate = 0.5 + (Math.random() * 1.25)
    $('.exchangeRate').text(exchangeRate.toFixed(2));
  }




  function getTickRate(tickRate) {
    if( tickRate >= 400 ) {
      tickRate = tickRate - 100;
      return tickRate;
    }
    else if ( tickRate < 400 && tickRate >= 125 ) {
      tickRate = tickRate - 25;
      return tickRate;
    }
    else if (tickRate < 125 && tickRate >= 15) {
      tickRate = tickRate - 10;
      return tickRate;
    }
    else {
      tickRate = tickRate / 2;
      return tickRate;
    }
  }

  function calculateOilLoss() {
    var probability = 100
    var randomInt = Math.floor((Math.random() * 100) +1)
    if ( randomInt == 100 || randomInt == 1 ) {
      oil = 0
      $('.oil').text(oil);
      $('.system-message').append('<p class="unlucky">There was a major fire in your oil fields. You\'ve lost it all! Oh no!</p>').fadeOut(3000, function() {
        $('.system-message').removeAttr("style").children("p").remove();
      });
    }
    else if ( randomInt < 100 && randomInt >= 75 ) {
      //Fairly unlucky roll. Lose % of oil and money
    }
    else if ( randomInt < 75 && randomInt >= 50 ) {
      //Fairly lucky roll. Money + but oil -
    }
    else if ( randomInt < 50 && randomInt > 1 ) {
      //Normal Roll. No change.
    }
    else {
      console.log("Logic error in method calculateOilLoss()");
    }
  }

});


/* Exchange rate changes every oil tick. You also have a small % chance to lose some oil every oil tick. */
