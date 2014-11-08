var ready_campaign = function() {
  if ($("#campaign-banner").length > 0) {
      $(document).ready(function() {
          window.sr = new scrollReveal();
      });
  }
}

$(document).on('page:load', ready_campaign);


var ready = function() {
  $(document).ready(function() {
    $(".campaigns-create-second").hide();
    $(".campaigns-create-third").hide();
    campaignsChangeDescription("one");

    $(".campaigns-create-field").focusin(function() {
      $(this).css("border-color", "#FFC953");
    });

    $(".campaigns-create-field").focusout(function() {
      var str = $(this).find("input");
      if(str.length != 0 && $.trim(str.val()).length == 0) {
        str.val("");
        $(this).css("border-color", "#FF0000");
      }
      else
        $(this).css("border-color", "#CCCCCC");
    });

    $("#campaign_description").on("change keyup paste", function() {
      if(!$("#campaigns-create-example-custom").hasClass("campaigns-create-example-colored"))
        campaignsChangeDescription("partial");
    });

    $("#campaigns-create-upload").change(function() {
      campaignsChangePreview(this);
    });

    $("#campaign_goal").on("change", function () {
      var param = $("#campaign_goal").val();
      param = param.replace(/\D/g, '');
      var count = 0;
      for(i = param.length-1; i >= 0; i--) {
        if(count < 3)
          count++;
        else {
          count = 0;
          console.log(param.substring(0,i+1));
          param = param.substring(0,i+1) + "," + param.substring(i+1);
        }
      }
      param = "$" + param + ".00";
      $("#campaign_goal").val(param);
    });
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);

function campaignsCreateSecond() {
  $(".campaigns-create-first").hide();
  $("#campaigns-create-title").text("Write a Mission Statement")
  $(".campaigns-create-second").show();
}

function campaignsCreateThird() {
  $(".campaigns-create-second").hide();
  $("#campaigns-create-title").text("Choose a Photo")
  $(".campaigns-create-third").show();
}

function campaignsChangeDescription(which, stay) {
  if(which == "one") {
    $("#campaigns-create-example-one").addClass("campaigns-create-example-colored");
    $("#campaigns-create-example-two").removeClass("campaigns-create-example-colored");
    $("#campaigns-create-example-custom").removeClass("campaigns-create-example-colored");
    $("#campaign_description").val("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
  }
  else if(which == "two") {
    $("#campaigns-create-example-two").addClass("campaigns-create-example-colored");
    $("#campaigns-create-example-one").removeClass("campaigns-create-example-colored");
    $("#campaigns-create-example-custom").removeClass("campaigns-create-example-colored");
    $("#campaign_description").val("Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.");
  }
  else if(which == "custom") {
    $("#campaigns-create-example-custom").addClass("campaigns-create-example-colored");
    $("#campaigns-create-example-one").removeClass("campaigns-create-example-colored");
    $("#campaigns-create-example-two").removeClass("campaigns-create-example-colored");
    $("#campaign_description").val("\n\n\nDon't drop the rock.");
  }
  else {
    $("#campaigns-create-example-custom").addClass("campaigns-create-example-colored");
    $("#campaigns-create-example-one").removeClass("campaigns-create-example-colored");
    $("#campaigns-create-example-two").removeClass("campaigns-create-example-colored");
  }
}

function campaignsChoosePicture() {
  $("#campaigns-create-upload").click();
}

function campaignsChangePreview(param) {
  if(param.files && param.files[0]) {
    var read = new FileReader();
    read.onload = function(e) {
      $("#campaigns-create-preview").attr("src", e.target.result);
    }
    read.readAsDataURL(param.files[0]);
  }
}
