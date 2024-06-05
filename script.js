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

    const apiUrl7Days = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FBangkok`;
    document.getElementById("loading").innerHTML = "Loading..";
	const response7Days = await fetch(apiUrl7Days); //Permintaan HTTP ke API untuk mendapatkan data cuaca
    var data7Days = await response7Days.json();
	document.getElementById("loading").innerHTML = "";
    
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

	//Proses Menampilkan Nama - nama hari dalam seminggu
	const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //array untuk nama2 hari
	const today = new Date(); //membuat objek 'date' yang berisi tanggal dan waktu saat ini
    const currentDayIndex = today.getDay(); //Mengambil indeks hari saat ini (0 untuk Sunday, dll)

	//looping menampilkan weather card selama 7 hari//
	for(let i=0; i<data7Days.daily.time.length; i++){
		const dayIndex = (currentDayIndex + i) % 7; //indeks hari saat ini yang diperoleh dari getDay() & operasi modulo memastikan bahwa hasil penjumlahan currentDayIndex + i selalu berada dalam rentang 0-6 /<7
		const dayName = daysOfWeek[dayIndex]; //Mengambil nama hari dari array daysOfWeek menggunakan indeks yang dihitung.
		document.getElementById("weatherDays").innerHTML += 
			`<div class="card-list">
				<img src=${wmo[data7Days.daily.weather_code[i]].day.image} width: 100px; alt="">
				<h3>${dayName}</h3>
				<p class="date-cards">${data7Days.daily.time[i]}</p>
				<div class="temp-cover">
					<p class="temp"> Max <br> ${data7Days.daily.temperature_2m_max[i]}°C</p>
					<p class="temp">Min <br> ${data7Days.daily.temperature_2m_min[i]}°C</p>
				</div>
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
		// comma: ",",
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    }; //opsi untuk format date terbaru

    const formattedDate = date.toLocaleDateString('en-GB', options); // Format the date
	let dateSplitted = formattedDate.split(' ');
	// console.log (dateSplitted[0] + ", " + dateSplitted[1] + " " + dateSplitted[2]+ " " + dateSplitted[3]);
    document.getElementById('currentDate').innerHTML =  (dateSplitted[0] + ", " + dateSplitted[1] + " " + dateSplitted[2]+ " " + dateSplitted[3]);
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



//WMO DATA //
const wmo = {
	"0":{
		"day":{
			"description":"Sunny",
			"image":"http://openweathermap.org/img/wn/01d@2x.png"
		},
		"night":{
			"description":"Clear",
			"image":"http://openweathermap.org/img/wn/01n@2x.png"
		}
	},
	"1":{
		"day":{
			"description":"Mainly Sunny",
			"image":"http://openweathermap.org/img/wn/01d@2x.png"
		},
		"night":{
			"description":"Mainly Clear",
			"image":"http://openweathermap.org/img/wn/01n@2x.png"
		}
	},
	"2":{
		"day":{
			"description":"Partly Cloudy",
			"image":"http://openweathermap.org/img/wn/02d@2x.png"
		},
		"night":{
			"description":"Partly Cloudy",
			"image":"http://openweathermap.org/img/wn/02n@2x.png"
		}
	},
	"3":{
		"day":{
			"description":"Cloudy",
			"image":"http://openweathermap.org/img/wn/03d@2x.png"
		},
		"night":{
			"description":"Cloudy",
			"image":"http://openweathermap.org/img/wn/03n@2x.png"
		}
	},
	"45":{
		"day":{
			"description":"Foggy",
			"image":"http://openweathermap.org/img/wn/50d@2x.png"
		},
		"night":{
			"description":"Foggy",
			"image":"http://openweathermap.org/img/wn/50n@2x.png"
		}
	},
	"48":{
		"day":{
			"description":"Rime Fog",
			"image":"http://openweathermap.org/img/wn/50d@2x.png"
		},
		"night":{
			"description":"Rime Fog",
			"image":"http://openweathermap.org/img/wn/50n@2x.png"
		}
	},
	"51":{
		"day":{
			"description":"Light Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Light Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"53":{
		"day":{
			"description":"Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"55":{
		"day":{
			"description":"Heavy Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Heavy Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"56":{
		"day":{
			"description":"Light Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Light Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"57":{
		"day":{
			"description":"Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Freezing Drizzle",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"61":{
		"day":{
			"description":"Light Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Light Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"63":{
		"day":{
			"description":"Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"65":{
		"day":{
			"description":"Heavy Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Heavy Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"66":{
		"day":{
			"description":"Light Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Light Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"67":{
		"day":{
			"description":"Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10d@2x.png"
		},
		"night":{
			"description":"Freezing Rain",
			"image":"http://openweathermap.org/img/wn/10n@2x.png"
		}
	},
	"71":{
		"day":{
			"description":"Light Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Light Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"73":{
		"day":{
			"description":"Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"75":{
		"day":{
			"description":"Heavy Snow",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Heavy Snow",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"77":{
		"day":{
			"description":"Snow Grains",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow Grains",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"80":{
		"day":{
			"description":"Light Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Light Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"81":{
		"day":{
			"description":"Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"82":{
		"day":{
			"description":"Heavy Showers",
			"image":"http://openweathermap.org/img/wn/09d@2x.png"
		},
		"night":{
			"description":"Heavy Showers",
			"image":"http://openweathermap.org/img/wn/09n@2x.png"
		}
	},
	"85":{
		"day":{
			"description":"Light Snow Showers",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Light Snow Showers",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"86":{
		"day":{
			"description":"Snow Showers",
			"image":"http://openweathermap.org/img/wn/13d@2x.png"
		},
		"night":{
			"description":"Snow Showers",
			"image":"http://openweathermap.org/img/wn/13n@2x.png"
		}
	},
	"95":{
		"day":{
			"description":"Thunderstorm",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Thunderstorm",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	},
	"96":{
		"day":{
			"description":"Light Thunderstorms With Hail",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Light Thunderstorms With Hail",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	},
	"99":{
		"day":{
			"description":"Thunderstorm With Hail",
			"image":"http://openweathermap.org/img/wn/11d@2x.png"
		},
		"night":{
			"description":"Thunderstorm With Hail",
			"image":"http://openweathermap.org/img/wn/11n@2x.png"
		}
	}
}









