
<?php
$category_script_path = locate_template( 'category-script.php', TRUE );
include ($category_script_path);

$result_query = mysql_query('SELECT * FROM  wp_spiffy_calendar ORDER BY event_begin LIMIT 0 , 3000');


while($row = mysql_fetch_assoc($result_query)){

     $row['event_begin'] = strtotime($row['event_begin']);
     $row['event_end'] = strtotime($row['event_end']);
     $json[] = $row;
}

?>

<script type="text/javascript">
        var currentCategory = <?php echo json_encode($current_category); ?>;
        var currentMonth = <?php echo json_encode($_GET["month"]); ?>;

var idToPass;

    function startLightbox (idToUse) {
  
        idToPass = idToUse;
            
            setTimeout(function(){
                sortAndDisplay();

            },700);
          
      }  

function compare(a,b) {
        if (a.event_begin > b.event_begin) {
              return -1;
      } else if (a.event_begin < b.event_begin)  {
              return 1;
              return 0;
      }
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;

    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

        if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp*1000);
    var months = [1,2,3,4,5,6,7,8,9,10,11,12];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();

    if (month < 10)
    {
      month = 0+month.toString();      
    }
    if (date < 10)
    {
      date = 0+date.toString();      
    }
        var time = year+'-'+month+'-'+date;
    return time;
}

function sortAndDisplay () {
    console.log(idToPass);
      var  arrayToSort = <?php echo json_encode($json); ?>;
  var newEventsArray = [];
    for (var i = 0; i < arrayToSort.length; i++) {
                 if (arrayToSort[i].event_recur === "W") {
                    for (var j = 0; j < arrayToSort[i].event_repeats; j++) {
                                
                                var eventToRecur = arrayToSort.slice(i, i+1);
                                var eventToClone = clone(eventToRecur[0]);

                                eventToClone.event_begin += 604800 * j;
                                eventToClone.event_end += 604800 * j;
                                eventToClone.event_begin = timeConverter( eventToClone.event_begin);
                                eventToClone.event_end = timeConverter( eventToClone.event_end);

                                eventToRecur.event_begin = timeConverter( eventToRecur.event_begin);
                                eventToRecur.event_end = timeConverter( eventToRecur.event_end);
                                newEventsArray.push(eventToClone);
                        };             
                } else if (arrayToSort[i].event_recur === "M") {
                        for (var j = 0; j < arrayToSort[i].event_repeats; j++) {
                                var eventToRecur = arrayToSort.slice(i, i+1);
                                var eventToClone = clone(eventToRecur[0]);
                                eventToClone.event_begin += 2419200;
                                eventToClone.event_end += 2419200;
                                
                                eventToClone.event_begin = timeConverter( eventToClone.event_begin);
                                eventToClone.event_end = timeConverter( eventToClone.event_end);

                                eventToRecur.event_begin = timeConverter( eventToRecur.event_begin);
                                eventToRecur.event_end = timeConverter( eventToRecur.event_end);
                                newEventsArray.push(eventToClone);
                        };   
                } else if (arrayToSort[i].event_recur === "Y") {
                        for (var j = 0; j < arrayToSort[i].event_repeats; j++) {
                                var eventToRecur = arrayToSort.slice(i, i+1);
                                var eventToClone = clone(eventToRecur[0]);
                                eventToClone.event_begin += 31556926;
                                eventToClone.event_end += 31556926;

                                eventToClone.event_begin = timeConverter( eventToClone.event_begin);
                                eventToClone.event_end = timeConverter( eventToClone.event_end);

                                eventToRecur.event_begin = timeConverter( eventToRecur.event_begin);
                                eventToRecur.event_end = timeConverter( eventToRecur.event_end);
                                newEventsArray.push(eventToClone);
                        };   
                } 
        };
        for (var k = 0; k < arrayToSort.length; k++) {
             arrayToSort[k].event_begin = timeConverter( arrayToSort[k].event_begin);
             arrayToSort[k].event_end = timeConverter( arrayToSort[k].event_end);
         }; 

        for (var i = 0; i < newEventsArray.length; i++) {
                arrayToSort.push(newEventsArray[i]);
        };
        console.log(arrayToSort);
        var sortedData = arrayToSort.sort(compare);
        displayEvents(sortedData, idToPass);

}

function dateConverter(dateReceived, targetDate){
    
    var targetMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    for (var i = 0; i < targetMonths.length; i++) {
             if (targetDate === targetMonths[i] ) {
                var newDate = dateReceived.split('');
                newDate.splice(6, 1, i+1);
                var finalDate = newDate.join('');
             }
        };
    return finalDate;
}

function displayEvents (sortedData, idToPass) {
   
                for (var i = 0; i < sortedData.length; i++) {
                  var divToAppend = document.createElement('div');

                  divToAppend.id = "event-popup-hidden-" + sortedData[i].event_begin;
                   var calendarDisplayName = document.getElementsByClassName("calendar-month-new");

                   for (var l = 0; l < calendarDisplayName.length; l++) {
                        var calendarDisplay = calendarDisplayName[l].innerHTML.split(" ")[0];
                        dateToConvert = idToPass.slice(19, 29);
                        var displayDate = dateConverter(dateToConvert, calendarDisplay);

                        if (sortedData[i].event_begin === displayDate) {
                        divToAppend.innerHTML ="<div id='lightbox-news-archive' class='" + currentCategory + "'>" +
                                                                        "<h1 class='lightbox-title'" + currentCategory + "'>" + sortedData[i].event_title +
                                                                        "</h1>" +
                                                                        "<div class='lightbox-news-item'>" + sortedData[i].event_desc +
                                                                                "<p>" +
                                                                                "<div class='left lightbox-date'" + currentCategory + "'>" +
                                                                                        "<div id='lightbox-date-number' class='clear " + currentCategory + "'>" + moment(sortedData[i].event_begin).format('DD')  + 
                                                                                        "</div>" +
                                                                                        "<div id='lightbox-date-month' class='clear " + currentCategory + "'>" + moment(sortedData[i].event_begin).format('MMM') + 
                                                                                        "</div>" +
                                                                                        "<div id='lightbox-date-month-year' class='clear " + currentCategory + "'>" + moment(sortedData[i].event_begin).format('YYYY') + 
                                                                                        "</div>" +
                                                                                "</div>" +
                                                                                "<div class='right lightbox-post-content " +  currentCategory + "'>" +
                                                                                        "<div class='lightbox-post-body " + currentCategory + "'>" + sortedData[i].event_desc +
                                                                                                "<p>" + moment(sortedData[i].event_begin).format('MMMM Do, YYYY') +
                                                                                                "<br/>" + " Time: " + sortedData[i].event_time +
                                                                                                "</p>" +
                                                                                                "<div class='clear'>" +
                                                                                                        "<a href='" + sortedData[i].event_link + " target='_blank'>More info</a>" +
                                                                                                "</div>" +
                                                                                        "</div>" +
                                                                                "</div>" +                                       
                                                                                "</p>" +                               
                                                                        "</div>" +
                                                                "</div>"    
            var lightboxDiv = document.getElementById("TB_ajaxContent");
            lightboxDiv.appendChild(divToAppend);  
          }     
      }
    };
}

</script>

<?php

/*

$daterecord = mysql_fetch_row($events_query);
$daterecord = $daterecord[1]; 


function group_header ($row)
{
$output .= '<div id="event-popup-hidden-'. $row['event_begin'] .'" class="hidden">';
//$output .= '<div id="event-popup-hidden-'. $row['event_id'] .'" class="hidden">';
return $output;
}

function group_footer ($row)
{
$output .= '</div>';
return $output;
}


function event_output ($current_category,$row)
{
   $this_event_date = explode('-',$row['event_begin']);
   //	$this_event_date = explode('-',$newtime);
   $this_event_month = date("M",$this_event_date[1]);
       //$this_event_month = date("M",strtotime($row['event_begin']));
   $this_event_month = date("M",strtotime($row['event_begin']));
   $this_event_time = date("G:i",strtotime($row['event_time'])) . ' - ' . date("G:i",strtotime($row['event_end_time']));


   $output =  ' 

   <div id="lightbox-news-archive" class="' . $current_category . '">
   <h1 class="lightbox-title ' . $current_category . '">' . $row['event_title'] . '</h1>
   <div class="lightbox-news-item">
   ' . $calendar_body . '  
   <p>	

   <div class="left lightbox-date ' . $current_category . '">

   <div id="lightbox-date-number" class="clear ' . $current_category . '">
   ' . $this_event_date[2]  . '
   </div>

   <div id="lightbox-date-month-year" class="clear ' . $current_category . '">
   ' . $this_event_month . ' / ' . $this_event_date[0] . '
   </div>

   </div>

   <div class="right lightbox-post-content ' . $current_category . '">
   <!--
   <h4 class="lightbox-post-title ' . $current_category . '">' . $row['event_title'] . '
   </h4>
   -->

   <div class="lightbox-post-body ' . $current_category . '">
   ' . $row['event_desc'];

   if ($row['event_end_time'] !== "00:00:00") {

       $output .=  
       '<p>' . $this_event_date[2] . ' ' . $this_event_month . ' ' . $this_event_date[0]. '<br />' . 
       $this_event_time . '
       </p>';
   }
   if ($row['event_link'] != '') { 
       $output .=  '
       <div class="clear">' . '<a href="' . stripslashes($row['event_link']) . '" target="_blank">
       More info</a></div>';
   }

   $output .=  '
   </div>
   </div>
   </p>
   </div>
   </div>

   ';

   return $output;
}



$events_query = ('SELECT * FROM  wp_spiffy_calendar ORDER BY event_begin LIMIT 0 , 3000');
$events_query = mysql_query($events_query);

$new_events = array();
while ($row = mysql_fetch_assoc($events_query)) {



$recurrences = $row['event_repeats'];


$row['event_begin'] = str_replace('/', '-', $row['event_begin']);

switch ($row['event_recur']) {
case 'W':

while ($recurrences-- +52)
{
$new_events[] = $row;
$new_row = $row;
$row['event_begin'] = date ('Y-m-d', strtotime('+1 week',strtotime($row['event_begin'])));

}

break;

case 'M':
while ($recurrences-- +12)
{
$new_events[] = $row;
$new_row = $row;
$row['event_begin'] = date ('Y-m-d', strtotime('+1 month',strtotime($row['event_begin'])));
}

break;

case 'Y':
while ($recurrences-- +2)
{
$new_events[] = $row;
$new_row = $row;
$row['event_begin'] = date ('Y-m-d', strtotime('+1 year',strtotime($row['event_begin'])));
}

break;

case 'S':

#$new_events[] = $row;
$new_row = $row;
break;

}	
$new_events[] = $new_row;

}

function sort_by_date($a, $b)
{
   $aa = $a['event_begin'] . $a['event_time'];
   $bb = $b['event_begin'] . $b['event_time'];

   return strcmp($aa, $bb);    
}
uasort($new_events, 'sort_by_date');
#Debugging by Misha
#echo '<pre>'; print_r($new_events); echo '</pre>'; 
// @MISHA - This also nearly worked...
$day_check = '';

foreach ($new_events as $row)
{
$day = $row['event_begin'];
if ($day != $day_check) 
{
if ($day_check != '') 
{
     	 echo '</div>'; // close the list here
 	 }
 	 echo group_header ($row);
   //echo 'begin> - '. $row['event_begin'];
   //echo '<div>', get_the_date()  ;
}

   echo event_output($current_category,$row);

   $day_check = $day;
}






*/

?>