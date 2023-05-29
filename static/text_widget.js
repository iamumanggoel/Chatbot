function TextWidget() {
  this.work_time = '';
  this.message = function() {
    return [
      '<div class="Prompt__MessageBubble">',
      '<div class="Prompt__AvatarCustom Prompt__AvatarCustom--BRight" style="background-image: url(static/assistant.png);">',
      '</div>',
      '<div class="Prompt__PromptText">',
      '<div class="TextInput__Bar"></div>',
      '</div>',
      '<div>',
      'Hi there, have a question? Text us here.',
      '</div>',
      '</div>',
      '</div>',
    ]
  }
	this.template = function() {
		return [
			'    <div class="hl_text-widget" id="hl_text-widget">',
			'      <button class="hl_text-widget--btn" id="hl_text-widget--btn">',
			'        <div class="icon widget-open-icon active">',
			'          <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 199.83 181.57" enable-background="new 0 0 199.83 181.57" xml:space="preserve" style="width:60%; height:auto;"><g><path fill="#fff" d="M182.21,35.37h-25.77V18.17c0-9.49-7.74-17.2-17.21-17.2H18.85c-9.48,0-17.2,7.71-17.2,17.2v77.38 c0,9.49,7.72,17.2,17.2,17.2v34.4l45.87-34.4h74.51c9.46,0,17.21-7.71,17.21-17.2V52.56h25.77v77.41h-17.18v17.18l-22.94-17.18    H70.14l-18.31,13.92c2.83,2.04,6.28,3.26,10.01,3.26h74.53l45.84,34.4v-34.4c9.49,0,17.21-7.69,17.21-17.18V52.56    C199.42,43.07,191.7,35.37,182.21,35.37z M58.98,95.55l-22.92,17.2v-17.2H18.85V18.17h120.38v77.38H58.98z"/><path fill="#fff" d="M36.06,52.56h77.37c4.76,0,8.59-3.83,8.59-8.59c0-4.75-3.83-8.6-8.59-8.6H36.06c-4.77,0-8.6,3.85-8.6,8.6 C27.46,48.73,31.29,52.56,36.06,52.56z"/><path fill="#fff" d="M96.25,69.78c0-4.77-3.87-8.61-8.6-8.61H36.06c-4.77,0-8.6,3.85-8.6,8.61c0,4.72,3.83,8.59,8.6,8.59h51.59    C92.38,78.37,96.25,74.5,96.25,69.78z"/></g></svg>',
			'        </div>',
			'        <div class="icon widget-close-icon">',
			'          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="24" height="24" viewBox="0 0 23.8 23.9">',
			'            <defs>',
			'              <style>',
			'                .cls-1 {',
			'                  fill: #fff;',
			'                  fill-rule: evenodd;',
			'                }',
			'              </style>',
			'            </defs>',
			'            <path d="M13.3 11.9L23.5 22.2C23.9 22.6 23.9 23.2 23.5 23.6 23.3 23.8 23.1 23.9 22.8 23.9 22.6 23.9 22.3 23.8 22.1 23.6L11.9 13.4 1.7 23.6C1.5 23.8 1.2 23.9 1 23.9 0.7 23.9 0.5 23.8 0.3 23.6 -0.1 23.2-0.1 22.6 0.3 22.2L10.5 11.9 0.3 1.7C-0.1 1.3-0.1 0.7 0.3 0.3 0.7-0.1 1.3-0.1 1.7 0.3L11.9 10.5 22.1 0.3C22.5-0.1 23.1-0.1 23.5 0.3 23.9 0.7 23.9 1.3 23.5 1.7L13.3 11.9Z"',
			'              class="cls-1" />',
			'          </svg>',
			'        </div>',
			'      </button>',
  '   <div class="hl_text-widget--box" id="hl_text-widget--box" style="display: none;">',
  '    <section class="msger">',
  '  <header class="msger-header">',
  '    <div class="msger-header-title">Koko Assistant Chatbot</div>',
  '<div class="Prompt__AvatarCustom Prompt__AvatarCustom--Bright" style="background-image: url(static/assistant.png);">',
  '<span class="online-ball"></span>',
'  </div>',
  '  </header>',
  '  <main class="msger-chat">',
  '    <div class="msg left-msg">',
  '      <img class="msg-img" src="/static/assistant.png">',
  '      <div class="msg-bubble">',
  '        <div class="msg-text">',
  '          Hi there! May I help you with something?  </div>',
  '      </div>',
  '    </div>',
  '  </main>',
  '  <div class="msger-inputarea">',
  '    <input type="text" class="msger-input" id="textInput" placeholder="Enter your message..." />',
  '   <script> function getInput(){let text=document.getElementById("textInput").value; console.log(text)}</script>',
  '    <button type="button" class="msger-send-btn" onclick="getInput()">Send</button>',
  '  </div>',
  '</section>',
  '<script>',
  'document.getElementById(\'textInput\').addEventListener("keyup", function(event) {',
  '    if (event.keyCode === 13) {',
  '        event.preventDefault();',
  '       document.getElementsByClassName(\'msger-send-btn\')[0].click()',
  '    }',
  '});',
  '</script>',

'    </div>',
'    </div>',
  '<script>',
  'const msgerForm = document.getElementsByClassName("msger-send-btn")[0];',
  'const msgerInput = document.getElementsByClassName("msger-input")[0];',
  'const msgerChat = document.getElementsByClassName("msger-chat")[0];',
  'msgerForm.addEventListener("click", (event) => {',
  '  const msgText = msgerInput.value;',
  '  if (!msgText) return;',
  '  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);',
  '  msgerInput.value = "";',
  '  conversation += "Me: " + msgText ;',
  '  botResponse(conversation);',
  '});',
  '</script>',
];
};
}

TextWidget.prototype.getworkTime = function() {
  return this.work_time;
};

TextWidget.prototype.bindClickHandler = function() {
  jQuery(function() {
    jQuery('#hl_text-widget--btn').on('click', function() {
      jQuery('.Prompt__MessageBubble').hide();
    
      var _this = jQuery(this);
      var _box = jQuery('#hl_text-widget--box');
      _this.toggleClass('active');
      _box.fadeToggle(300);
      _box.toggleClass('active');
      _this.find('.widget-open-icon').toggleClass('active');
      _this.find('.widget-close-icon').toggleClass('active');
    });
  });
};

TextWidget.prototype.loadCSS = function() {
  var _self = this;
  jQuery('head').append(
    '<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">'
  );
  jQuery('head').append(
    '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">'
  );
  jQuery('head').append(
    '<meta name="HandheldFriendly" content="true">'
  );

  jQuery('head').append(
    '<link href="./static/styles/text_widget.css" rel="stylesheet" type="text/css" />'
  );
  jQuery('head').append(
    '<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" type="text/css" />'
  );
  jQuery('head').append(
    '<script src="https://unpkg.com/libphonenumber-js/bundle/libphonenumber-js.min.js"></script>'
  );
  
  var checkReady = function(callback) {
    if (window.libphonenumber) {
      callback();
    } else {
      window.setTimeout(function() {
        checkReady(callback);
      }, 100);
    }
  };

  setTimeout(function() {
    checkReady(function() {
      _self.addTemplateToPage();
    });
  }, 600);

  setTimeout(function() {
    checkReady(function() {
      _self.addmessageToPage();
    });
  }, 1500);
};

TextWidget.prototype.addTemplateToPage = function() {
  var element = document.createElement('div');
  element.id = 'hl_text-widget';
  element.className = 'hl_text-widget';
  element.innerHTML = this.template().join('\n');
  jQuery('body').append(element);

  this.bindClickHandler();
};

TextWidget.prototype.addmessageToPage = function() {
  var element = document.createElement('div');
  element.id = 'hl_text-widget';
  element.className = 'hl_text-widget';
  element.innerHTML = this.message().join('\n');
  jQuery('body').append(element);

};


TextWidget.prototype.load = function() {
  var _self = this;
  if (typeof jQuery !== 'undefined') {
    setTimeout(function() {
      _self.loadCSS();
    }, 300);
  } else {
    var script = document.createElement('SCRIPT');
    script.src =
      'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

    var checkReady = function(callback) {
      if (window.jQuery) {
        callback(jQuery);
      } else {
        window.setTimeout(function() {
          checkReady(callback);
        }, 100);
      }
    };

    checkReady(function(jQuery) {
      setTimeout(function() {
        _self.loadCSS();
      }, 600);
    });

  }
};


var PROVISION =
  PROVISION ||
  (function() {
    return {
      init: function(locationId, extras) {
        var widget = new TextWidget();
        if (extras && extras.baseURL){
          widget.serverURL = extras.baseURL;
        } else {
          widget.serverURL = 'https://api.gohighlevel.com';
        }
        widget.locationId = locationId;
        if (extras && extras.work_time) widget.work_time = extras.work_time;
        widget.load();
    }
  };
})();


var conversation = "";
const BOT_IMG = "/static/assistant.png";
const PERSON_IMG = "/static/user.png";
const BOT_NAME = "Koko Assistant";
const PERSON_NAME = "Me";



function appendMessage(name, img, side, text) {
  const isRightSide = side;
  let msgHTML;
  if (isRightSide === "left"){
  msgHTML = `
  <div class="msg ${side}-msg">
    <img class="msg-img" src="${img}" width="30">
    <div class="msg-bubble">
      <div class="msg-text">${text}</div>
    </div>
    <div class="msg-info-time">${formatDate(new Date())}</div>
  </div>
  `;
  }
  else{
    msgHTML = `
  <div class="msg ${side}-msg">
    <div class="msg-bubble">
      <div class="msg-text">${text}</div>
    </div>
    <div class="msg-info-time">${formatDate(new Date())}</div>
  </div>
  `;
  }
  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
  }




  function botResponse(rawText) {
    // Bot Response
    $.post("/chat", { query: rawText }).done(function (data) {
      let msgText = data;
      conversation += "Koko Assistant: " + msgText + "\n";
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      let formattedText = msgText.replace(urlRegex, function (url) {
        if (url.endsWith('.') || url.endsWith(')')) {
          url = url.slice(0, -1);
        }
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
      });
      if (msgText.includes("smile@kokofaceyoga.com")) {
        let emailButton = `
            <button class="send-email-btn" onclick="contactUs()">
              Contact Us
            </button>
          `;
          formattedText = msgText = msgText.replace(/smile@kokofaceyoga\.com/g, emailButton);
      }
      appendMessage(BOT_NAME, BOT_IMG, "left", formattedText);
    });
  }


function contactUs() {
  var url = "https://kokofaceyoga.com/contact";
  window.open(url, "_blank", "width=500,height=600");
}
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function sendEmail() {
  window.open("https://kokofaceyoga.com/contact", "_blank", "width=500,height=600");
}

