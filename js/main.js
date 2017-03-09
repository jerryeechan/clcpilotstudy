var video_id = 'a3CbSDzW2N0';
var prev_text = '';
jQuery("#player").tubeplayer({
    width: 560, // the width of the player
    height: 315, // the height of the player
    allowFullScreen: "false", // true by default, allow user to go full screen
    initialVideo: video_id, // the video that is loaded into the player
    preferredQuality: "default", // preferred quality: default, small, medium, large, hd720
    onPlay: function(id) {}, // after the play method is called
    //onPause: function(){}, // after the pause method is called
    onStop: function() {}, // after the player is stopped
    //onSeek: function(time){}, // after the video has been seeked to a defined point
    onMute: function() {}, // after the player is muted
    onUnMute: function() {} // after the player is unmuted
});


$.ajax({
    type: "GET",
    url: 'https://www.youtube.com/api/timedtext?caps=asr&asr_langs=ko%2Cit%2Cde%2Cnl%2Cpt%2Cru%2Cfr%2Cen%2Cja%2Ces&sparams=asr_langs%2Ccaps%2Cv%2Cexpire&signature=19898FCD8DEFB1C8AFF418A9AB74B49A699E497C.BF1BDB4F0663977E78665E01F42B527AC128A246&key=yttt1&v=a3CbSDzW2N0&hl=zh_TW&expire=1489062188&lang=zh-TW&fmt=srv3',
    dataType: "xml",
    success: function(xml) {
        $(xml).find('p').each(function() {
            var starttime = $(this).attr('t');
            starttime /= 1000;
            var transcript = $(this).text();
            var dur = $(this).attr('d');
            dur /= 1000;
            $('#cc').append('<span id="seek" data-time="' + starttime + '" data-dur="' + dur + '">' + transcript + '</span> ');
        });
    }
});

window.setInterval(function() {
    var video_duration = $("#player").tubeplayer("data").duration;
    var current_time = $("#player").tubeplayer("data").currentTime;
    //current_time = Math.floor(current_time);
    $("#whatupyo").attr("value", current_time);
    $rightnow = $("#whatupyo").val();

    function thisisright() {
        return ($(this).attr("data-time") <= $rightnow && ($(this).attr("data-time") + $(this).attr("data-dur") >= $rightnow))
    }

    function addremoveclass() {
        var clip_start = parseInt($(this).attr('data-time'), 10);
        var clip_dur = parseInt($(this).attr('data-dur'), 10);
        var atm = parseInt($rightnow);
        return clip_start <= atm && (clip_start + clip_dur) >= atm;
    }

    $("[data-time]").filter(addremoveclass).addClass('yellow').end().not(addremoveclass).removeClass('yellow');
    //console.log($("[data-time]").filter(addremoveclass)[0].innerHTML);
    //$("dynamic").append($("[data-time]").filter(addremoveclass)[0].innerHTML);
    
    var current_text = $("[data-time]").filter(addremoveclass)[0].innerHTML;

    if(current_text.indexOf(prev_text)==-1){
    	$('#dynamic').val($('#dynamic').val() + $("[data-time]").filter(addremoveclass)[0].innerHTML );
    	console.log("current_text:" + current_text);
    }
    prev_text = current_text;

    var textarea = document.getElementById('dynamic');
	textarea.scrollTop = textarea.scrollHeight;

}, 500);

$('#play').click(function() {
    $('#player').tubeplayer("play");
});
$('#pause').click(function() {
    $('#player').tubeplayer("pause");
});
$('#mute').click(function() {
    $('#player').tubeplayer("mute");
});
$('#newvid').click(function() {
    $('#player').tubeplayer("play", 'YtiFjPVZKHI');
});
$('#timestamp').click(function() {
    $("#showme").text($("#player").tubeplayer("data").currentTime);
});

/*
$('body').on("click", "#seek", function(){
	var foo = $(this).attr('data-time');
	$('#hiddentimeholder').text(foo);
	var foobar = $('#hiddentimeholder').text();
	$('#player').tubeplayer("seek", foobar);
});*/
/*
$("#gradient").after("<div class='show-hide' style='width:" + $('#cc').css("width") + "; text-align: center; position:relative; top: -28px; text-shadow: 1px 1px 2px white;'>Hide / Show Transcript</div>");
$('.show-hide').click(function() {
    $('#gradient').toggle('slow');
    $('.ui-resizable').slideToggle('slow');
});*/

$(".resizable").wrap('<div/>').css({ 'overflow': 'hidden' }).parent()
    .css({
        'display': 'inline-block',
        'overflow': 'hidden',
        'height': function() {
            return $('.resizable', this).height();
        },
        'width': function() {
            return $('.resizable', this).width();
        },
        'paddingRight': '12px',
    }).resizable({
        start: function(event, ui) {
            $(".ui-resizable-s").addClass('noclick');
        },
        stop: function(event, ui) {
            $('body').css('cursor', 'default');
        }
    }).find('.resizable')
    .css({
        overflow: 'auto',
        width: '100%',
        height: '100%',
    });

// Handle resizing, click and draggable
$(".ui-resizable-s").click(function() {
        if ($(this).hasClass('noclick')) {
            $(this).removeClass('noclick');
        } else {
            $('#gradient').toggle('slow');
            $('.ui-resizable').slideToggle('slow');
        }
    })
    .css("minHeight", "16px")
    .css("minWidth", "16px");


