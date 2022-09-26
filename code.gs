function doGet(e)
{
    return HtmlService.createTemplateFromFile('index').evaluate().setTitle("protosem");
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}


function fetchEmailId()
{

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Master");
  
  var response ={};
  
  var emails = sheet.getRange(2, 1, sheet.getLastRow()).getValues();

  var pwds = sheet.getRange(2, 2, sheet.getLastRow()).getValues();
  
  response.status = "success";
  response.emailid=emails;
  response.pwd = pwds;
  
  return JSON.stringify(response);
  
}



function authenticateUser(userdata)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Master");
  var status = "fail";
  var userids = sheet.getRange(1, 1, sheet.getLastRow()).getValues();
  var userpass = sheet.getRange(1, 2, sheet.getLastRow()).getValues();
  
  var userDetails = JSON.parse(userdata);
  
  var useremail = userDetails.userid;
  var userpassword = userDetails.userpass;
  
  var found = 0;
  
  for(var i=0;i< userids.length;i++)
  {
    if(userids[i]==useremail && userpass[i]== userpassword)
    {
      found =1;
      status = "success";
      break;
    }
    
  }
  return status;
}


function saveToSheet(userdata)
{
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Database");
  var lastrow = sheet.getLastRow()+1;
  var userdetails = JSON.parse(userdata);
  
  var curdate = Utilities.formatDate(new Date(), "IST", "dd/MM/YYYY");
  var useremail = userdetails.userid;
  var userattendancetype = userdetails.attendanceType;
  var username = userdetails.username;
  var curtime = userdetails.currentTime;
  var latlong = userdetails.latlong;
  var lat = latlong.split(",")[0];
  var long = latlong.split(",")[1];
  var mapLink = 'https://www.openstreetmap.org/?mlat=' + lat + '&mlon='+long+'#map=18/' + `${lat}\/${long}`;
  sheet.getRange(lastrow, 1).setValue(curdate);
  sheet.getRange(lastrow, 2).setValue(username);
  sheet.getRange(lastrow, 3).setValue(useremail);
  sheet.getRange(lastrow, 4).setValue(userattendancetype);
  sheet.getRange(lastrow, 5).setValue(curtime);
  
  sheet.getRange(lastrow, 6).setValue(latlong);
  sheet.getRange(lastrow, 7).setValue(mapLink);
  return "success";
  
  
}
