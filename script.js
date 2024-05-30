async function fetchData(searchCity) { //mewakili pembuatan variabel
    
    document.getElementById("weatherDays").innerHTML = ""; //reset
    //kondisi if else
    if (searchCity === undefined){ //false = kosong / undefined
        searchCity = 'jakarta'; // kalau di kolom search kosong, maka menampilakn default jakarta
    }
    
    console.log (searchCity); 

    const apiKeySearch = "9f17a95f99ca72449c06212fd648d40e";
    const apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKeySearch}&units=metric`;
    
    const responseSearch = await fetch(apiUrlSearch); 
    var dataSearch = await responseSearch.json(); //Mengonversi respons JSON menjadi objek JavaScript
    console.log(dataSearch);
    
    // 7Days & Current //
    let lon = dataSearch.coord.lon;
    let lat = dataSearch.coord.lat;

    const apiUrl7Days = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FBangkok`; 
    const response7Days = await fetch(apiUrl7Days); //Permintaan HTTP ke API untuk mendapatkan data cuaca
    var data7Days = await response7Days.json();
    
    //looping menampilkan weather selama 7 hari//
    for(let i=0; i<data7Days.daily.time.length; i++){
        document.getElementById("weatherDays").innerHTML += 
            `<div class="card-list">
                <h3>Sunday</h3>
                <img src="images/icon-awan.png" width="120px" style="padding-top: 20px;" alt="">
                <p>${data7Days.daily.temperature_2m_max[i]}</p>
            </div>`

    }

    // Menampilkan Suhu Saat ini //
    const apiUrlCurrent =`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`;
    const response = await fetch(apiUrlCurrent);
    var dataCurrent = await response.json();

    console.log(dataCurrent)

    document.getElementById('temperature').innerHTML = `${dataCurrent.current.temperature_2m} °C`;
}

fetchData();

//membuat function search untuk memanggil inputan search//

function search() {
    let searchCity = document.getElementById("search-input").value;
    fetchData(searchCity);
    kota(searchCity);
}

function fetchData(city){
    console.log(`fetching data for ${city}`);
}

function kota(searchCity){
    document.getElementById("nama-kota").innerHTML = searchCity;
}

