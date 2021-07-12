// function resettxt() {
//   em = $("#eml");
//   if (em.attr("flag") == "1") {
//     $("#emailhelp").html(
//       "<small>We'll never share your email with anyone else.</small>"
//     );
//     em.attr("flag", "0");
//   }
// }
// $("form").submit(function () {
//   alert("hii");
//   $(this).find("input").css({
//     "background-color": "red",
//   });
// });

validatereg=(e) => {
  alert("Yooo")
  email=document.getElementById('eml2')
  console.log(email.value)
  if (email.value.endsWith("@gmail.com")) {
    return true
  }
  console.log(e)
  document.getElementById("err").style.display="block"
  document.getElementById("err").innerHTML = '<i class="fas fa-exclamation-circle"></i> Email must be ending with "@gmail.com"'
  return false;
}

function validate(eml) {
  s_id=eml.getAttribute('erf')
  s=$("#"+s_id)
  s.html("")
  if (eml.value.endsWith("@gmail.com")) {
    return true
  }
  s_id=eml.getAttribute('erf')
  s=$("#"+s_id)
  s.html('<i class="fas fa-exclamation-circle"></i>&nbsp;Provide an email ending with \"@gmail.com\"')
  s.css("display", "block")
  console.log("done")
  return false;
}

// Toggle eye button
function togglepwd() {
  p = $(".pwdf")[0];
  if (p.type == "password") {
    $(".pwdf").each(function (i, obj) {
      obj.type = "text";
      $("#eye").removeClass("fa-eye");
      $("#eye").addClass("far eye fa-eye-slash");
    });
  } else {
    $(".pwdf").each(function (i, obj) {
      obj.type = "password";
      $("#eye").removeClass("fa-eye-slash");
      $("#eye").addClass("far eye fa-eye");
    });
  }
}

function matchpwd() {
  p1 = document.querySelector("#pwd1").value;
  p2 = document.querySelector("#pwd2").value;
  if ((p1 != p2) & (p2.length > 0) & (p2.length > 0)) {
    console.log("notmatched")
    console.log(p1+"--"+p2)
    document.getElementById("notmatched").style.display = "block";
    document.getElementById("signupbtn").disabled = true;
  } else {
    console.log("matched....")
    console.log(p1+"--"+p2)
    document.getElementById("notmatched").style.display = "none";
    document.getElementById("signupbtn").disabled = false;
  }
}

$(function () {
  document.getElementById("lgnbtn").addEventListener("click", function () {
    document.getElementsByClassName("log_reg")[0].style.display = "flex";
    document.getElementById("log").style.display = "block";
    const elem = document.getElementsByClassName("popfrm");
  });
});

hideall = () => {
  const elem = document.getElementsByClassName("popfrm");
  l = elem.length;
  $('.errmsg').html("")
  for (i = 0; i < l; i++) {
    elem[i].reset();
    elem[i].style.display = "none";
  }
};

getemlfrm = () => {
  hideall();
  document.getElementById("emalf").style.display = "block";
};
$(function () {
  document.getElementById("lgnbtn").addEventListener("click", function () {
    document.getElementsByClassName("log_reg")[0].style.display = "flex";
    document.getElementById("log")[0].style.display = "block";
  });
  // Close btn event
  document
    .getElementsByClassName("closebtn")[0]
    .addEventListener("click", function () {
      hideall();
      document.getElementsByClassName("log_reg")[0].style.display = "none";
      document.getElementById("log")[0].style.display = "none";
    });
  // register button event handlers
  document.getElementById("regbtn").addEventListener("click", function () {
    hideall();
    document.getElementById("regf").style.display = "block";
  });

  // hide segment
  $(document).click(function (e) {
    if (
      (e.target.id != "smting") &
      (e.target.id != "lgnbtn") &
      (e.target.length === 0)
    ) {
      hideall();
      document.getElementsByClassName("log_reg")[0].style.display = "none";
      document.getElementById("log")[0].style.display = "none";
    }
  });
  Array.from(document.getElementsByClassName("logfrm")).forEach((element) => {
    element.addEventListener("click", function (e) {
      hideall();
      document.getElementById("log").style.display = "block";
    });
  });
  Array.from(document.getElementsByTagName('form')).forEach(element => {
    element.addEventListener("submit",(e)=>{
      console.log(e.target)
    })
  })

  
  $("#emalf").submit(function(form){
    form.preventDefault()
    // url=form.getAttribute("action")
    console.log(form)
    alert("data")
    $.ajax({
      url: '/sendmail',
      type: 'post',
      data: {
        'email': document.getElementById('eml3').value,
      },
      beforeSend: function(xhr) {
          $("#vspin").show()
          $("#erv").html("")
          if(!validate(document.getElementById('eml3'))){
            console.log("mail not valid...")
            $("#erv").html("")
            xhr.abort()
          }
      },
      success: function(data) {
        $("#vspin").show()
        console.log(data)
        console.log("Success called")
          if(data['msg']=="no user found"){
            temp=$("#erl")
            temp.html('<i class="fas fa-exclamation-circle"></i>&nbsp;No user found with this email')
            temp.show()
          }
          else if(data['msg']=="wrong pwd"){
            temp=$("#erlp").html('<i class="fas fa-exclamation-circle"></i>&nbsp;No account found with this email')
            temp.html('<i class="fas fa-exclamation-circle"></i>&nbsp;No account found with this email')
            temp.show()
          }
          else{
            console.log("mil gya...")
          }
      }
  })
  })
  

  
$("#log").submit(function(form){
  alert("iiiii")
  form.preventDefault()
  // url=form.getAttribute("action")
  console.log(form)
  alert("data")
  $.ajax({
    url: '/auth',
    type: 'post',
    data: {
      'email': document.getElementById('eml').value,
      "pwd": document.getElementById('pwd').value
    },
    beforeSend: function(xhr) {
        $("#erlp").html("")
        console.log("beforesend......")
        console.log(document.getElementById('eml').value)
        if(!validate(document.getElementById('eml'))){
          console.log("mail not valid...")
          // form.preventDefault()
          xhr.abort()
        }
    },
    success: function(data) {
      console.log(data)
      console.log("Success called")
        if(data['msg']=="no user found"){
          temp=$("#erl")
          temp.html('<i class="fas fa-exclamation-circle"></i>&nbsp;No user found with this email')
          temp.show()
        }
        else if(data['msg']=="wrong pwd"){
          temp=$("#erlp")
          temp.html('<i class="fas fa-exclamation-circle"></i>&nbsp;Check your password')
          temp.show()
        }
    }
})
})

FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});

});
