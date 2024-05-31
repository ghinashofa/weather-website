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
    
    // ===== Menampilkan  Tanggal Pada Setiap Card ===== //
    const dateString7Days = data7Days.daily.time; 
    const options7Days = { 
        weekday: 'long', 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    }; 

    const formatDate = (date) => date.toLocaleDateString('en-GB', options7Days);
    let formattedDateCard = '';
    dateString7Days.forEach(dateStr => {
        const date = new Date(dateStr); 
        const formattedDate = formatDate(date); 
        formattedDateCard += `<p>${formattedDate}</p>`; 
    });
    

    //looping menampilkan weather card selama 7 hari//
    for(let i=0; i<data7Days.daily.time.length; i++){
        document.getElementById("weatherDays").innerHTML += 
            `<div class="card-list">
                <img src="images/icon-awan.png" width="100px" alt="">
                <h3>Sunday</h3>
                <p class="date-cards">${data7Days.daily.time[i]}</p>
                <p class="temp">${data7Days.daily.temperature_2m_max[i]}°C</p>
            </div>`

    }

    // Menampilkan Suhu Saat ini //
    const apiUrlCurrent =`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`;
    const response = await fetch(apiUrlCurrent);
    var dataCurrent = await response.json();

    console.log(dataCurrent)

    document.getElementById('temperature').innerHTML = `${dataCurrent.current.temperature_2m} °C`;

    // ====== menampilkan tanggal saat ini ======
    const dateString = dataCurrent.current.time; 
    const date = new Date(dateString); //konversi ke data object
    const options = { 
        weekday: 'long', 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    }; //opsi untuk format date terbaru

    const formattedDate = date.toLocaleDateString('en-GB', options); // Format the date
    document.getElementById('currentDate').innerHTML = formattedDate;
}

fetchData();

// === membuat function search untuk memanggil inputan search ===//

function search() {
    let searchCity = document.getElementById("search-input").value; //mengambil inputan yang dimasukkan oleh user
    fetchData(searchCity); //diteruskan ke function search data untuk memproses data weather
    kota(searchCity); //memanggil function kota untuk memberikan nilai input pengguna ke fungsi kota
}

// ====== function untuk menampilkan nama kota sesuai search ======

function fetchDataKota(city){
    console.log(`fetching data for ${city}`); //mengambil data dari API untuk melanjutkan ke function kota
}

function kota(searchCity){
    document.getElementById("nama-kota").innerHTML = searchCity; //menampilkan inputan user di id nama-kota
}









