
    const timeEl=document.getElementById('time');
    const dateEl=document.getElementById('date');
    const currentWeatherItemEl=document.getElementById('currentweatheritem')
    const timezone=document.getElementById('time-zone');
    const countryEl=document.getElementById('country');
    const weatherFrecastEl=document.getElementById('weather-forcast')
    const currentTempEl=document.getElementById('current-temp')

    const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',]
    const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
    setInterval(()=>{
        const time=new Date();
        const month=time.getMonth();
        const date= time.getDate();
        const day=time.getDay();
        const hour=time.getHours();
        const hoursIn12HrsFormat=hour>=13? hour %12:hour
        const minutes=time.getMinutes()
        const ampm=hour>=12?'Pm':'Am'
        timeEl.innerHTML= (hoursIn12HrsFormat<10?'0'+ hoursIn12HrsFormat : hoursIn12HrsFormat) +':'+(minutes<10?'0'+minutes:minutes) +''+ `<span id="am-pm"> ${ampm} </span>`
        dateEl.innerHTML=days[day]+','+date+ ' ' +months[month]


    },1000)
    getWeatherDate()
    function getWeatherDate()
    {
        navigator.geolocation.getCurrentPosition((success)=>{
            console.log(success)
            let {latitude,longitude}=success.coords;
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res=>res.json().then(data=>{
                console.log(data)
                 showWeatherStatus(data)
            }))


            
        
        })
    }
    function showWeatherStatus(data)
    {
        let {humidity,pressure,wind_speed,sunrise,sunset}=data.current;
         timezone.innerHTML=data.timezone;
         countryEl.innerHTML=data.lat+ 'N' +data.lon +'E'
        currentWeatherItemEl.innerHTML=
       ` <div class="weather-item">
        <P>Humidity </P>
        <P>${humidity} </P>

    </div>
    <div class="weather-item">
        <P>pressure </P>
        <P>${pressure}</P>

    </div>
    <div class="weather-item">
        <P>wind speed </P>
        <P>${ wind_speed} </P>

    </div>
    <div class="weather-item">
    <P>sunrise </P>
    <P>${window.moment(sunrise*1000).format('HH:mm a')} </P>

     </div>

     <div class="weather-item">
     <P>sunset </P>
     <P>${window.moment(sunset*1000).format('HH:mm a') } </P>

     </div> `


    

     let otherDayforcast=''

     data.daily.forEach((day,index)=> {
         if(index==0){
            currentTempEl.innerHTML= `
        
             <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather">
            <div class="other"> 
             <div class="day">${window.moment(day.dt*1000).format('ddd') }</div>
              <div class="temp">Night-${day.temp.night}&#176;c</div>
              <div class="temp">Day-${day.temp.day}&#176;c</div>
  </div>           
 `

         }else
         {
             otherDayforcast+=`
         <div class="weather-forcast-item">
         <div class="day"> ${window.moment(day.dt*1000).format('ddd') }</div>
         <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather">
         <div class="temp">Night-${day.temp.night}&#176;c</div>
         <div class="temp">Day-${day.temp.day}&#176;c</div>
 
     </div>`


         }
         weatherFrecastEl.innerHTML=otherDayforcast;
      


         
     });

    
     

    
    



}