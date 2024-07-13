let girdi = document.getElementById("girdi")
let arama = document.getElementById("arama")
let tarih = document.getElementById("tarih")
let saat = document.getElementById("saat")
let tatliKediSesi = document.getElementById("tatliKediSesi")
let kizginKediSesi = document.getElementById("kizginKediSesi")
let gorevEklemeButonu = document.getElementById("gorevEklemeButonu")
let liste = document.getElementById("liste")

gorevEklemeButonu.addEventListener("click", () => {

    // Object ekleme
    let gorevler = {
        id: new Date().getTime().toString(),
        isim: girdi.value,
        tamamlama: false,
        tarih: tarih.value,
        saat: saat.value,
    }

    if (girdi.value.trim() === "") {
        alert("Lütfen Görevinize Bir İsim Veriniz.")
        return
    }

    // Görev Divini Oluşturma
    let gorevDiv = document.createElement("div")
    gorevDiv.className = "gorevdivi"
    liste.appendChild(gorevDiv)
    gorevDiv.setAttribute("draggable", "true")

    // Benzersiz id atama
    gorevDiv.setAttribute("id", `gorev-${new Date().getTime()}`)

    // Görev oluştur
    let gorevOlustur = document.createElement("p")
    gorevOlustur.textContent = girdi.value
    gorevDiv.appendChild(gorevOlustur)

    // Görev Silme
    let gorevSilmeButonu = document.createElement("button")
    gorevSilmeButonu.className = "silmeButonu"
    gorevDiv.appendChild(gorevSilmeButonu)
    gorevSilmeButonu.textContent = "X"

    gorevSilmeButonu.addEventListener("click", () => {
        kizginKediSesi.play()
        gorevDiv.remove()
        localStorage.removeItem(gorevler.id)
    })

    // Görev Tamamlama
    let gorevTamamlamaButonu = document.createElement("button")
    gorevTamamlamaButonu.className = "tamamlaButonu"
    gorevDiv.appendChild(gorevTamamlamaButonu)
    gorevTamamlamaButonu.textContent = "✓️"

    gorevTamamlamaButonu.addEventListener("click", () => {
        tatliKediSesi.play()
        gorevOlustur.classList.toggle("tamamlandi");
        gorevOlustur.classList.contains("tamamlandi") ? gorevler.tamamlama = true : gorevler.tamamlama = false;
        localStorage.setItem(gorevler.id, JSON.stringify(gorevler));
    });

    // Görev Düzenle
    let gorevDuzenleButonu = document.createElement("button")
    gorevDuzenleButonu.className = "duzenleButonu"
    gorevDiv.appendChild(gorevDuzenleButonu)
    gorevDuzenleButonu.textContent = "✎"

    gorevDuzenleButonu.addEventListener("click", () => {
        let yeniGirdi = prompt("Görevi Düzenleyin:", girdi.value)
        gorevOlustur.textContent = yeniGirdi
        gorevler.isim = yeniGirdi
        localStorage.setItem(gorevler.id, JSON.stringify(gorevler));
    })


    // Drag Drop Özellikleri
    gorevDiv.addEventListener("dragstart", (olay) => {
        olay.dataTransfer.setData("text", olay.target.id)
    })

    gorevDiv.addEventListener("dragover", (olay) => {
        olay.preventDefault()
    })

    gorevDiv.addEventListener("drop", (olay) => {
        olay.preventDefault()
        let birakilanOgeninIdsi = document.getElementById(olay.dataTransfer.getData("text", olay.target.id))
        liste.appendChild(birakilanOgeninIdsi)
    })

    // Tarih ekleme
    if (tarih.value !== "") {
        let tarihSpaniOlustur = document.createElement("span")
        tarihSpaniOlustur.className = "tarihDegeri"
        tarihSpaniOlustur.textContent = tarih.value
        gorevDiv.appendChild(tarihSpaniOlustur)
    }  

    // Saat ekleme
    if (saat.value !== "") {
        let saatSpaniOlustur = document.createElement("span")
        saatSpaniOlustur.className = "saatDegeri"
        saatSpaniOlustur.textContent = saat.value
        gorevDiv.appendChild(saatSpaniOlustur)
    }     

    // Localstroage ye verileri kaydet
    localStorage.setItem(gorevler.id, JSON.stringify(gorevler))

    girdi.value = ""
})

// Arama Butonu
arama.addEventListener("input", () => {
    let aramaDegeri = arama.value.toLowerCase()
    let gorevMetinlerininHepsi = Array.from(document.querySelectorAll(".gorevdivi p"))
    gorevMetinlerininHepsi.forEach(tekGorevMetni => {
        let gorevMetni = tekGorevMetni.textContent.toLowerCase()
        tekGorevMetni.parentElement.style.display = gorevMetni.includes(aramaDegeri) ? "" : "none"
    });
})

// Localdeki görevleri al
let gorevleriAl = () => {
    Object.keys(localStorage).forEach(herBirAnahtar => {
        let localdekiAnahtarlarinTumu = JSON.parse(localStorage.getItem(herBirAnahtar))
        yansit(localdekiAnahtarlarinTumu)
    });
}


// Ekrana yazdır
let yansit = (herBirGorev) => {
    // Görev Divini Oluşturma
    let gorevDiv = document.createElement("div")
    gorevDiv.className = "gorevdivi"
    liste.appendChild(gorevDiv)

    // Görev oluştur
    let gorevOlustur = document.createElement("p")
    gorevOlustur.textContent = herBirGorev.isim
    gorevDiv.appendChild(gorevOlustur)

    // Görev Silme
    let gorevSilmeButonu = document.createElement("button")
    gorevSilmeButonu.className = "silmeButonu"
    gorevDiv.appendChild(gorevSilmeButonu)
    gorevSilmeButonu.textContent = "X"

    gorevSilmeButonu.addEventListener("click", () => {
        kizginKediSesi.play()
        gorevDiv.remove()
        localStorage.removeItem(herBirGorev.id)
    })

    // Görev tamamlanmışsa bunu yükle
    if (herBirGorev.tamamlama) {
        gorevOlustur.classList.add("tamamlandi")
    }

    // Görev Tamamlama
    let gorevTamamlamaButonu = document.createElement("button")
    gorevTamamlamaButonu.className = "tamamlaButonu"
    gorevDiv.appendChild(gorevTamamlamaButonu)
    gorevTamamlamaButonu.textContent = "✓️"

    gorevTamamlamaButonu.addEventListener("click", () => {
        tatliKediSesi.play()
        gorevOlustur.classList.toggle("tamamlandi")
        gorevOlustur.classList.contains("tamamlandi") ? herBirGorev.tamamlama = true : herBirGorev.tamamlama = false
        localStorage.setItem(herBirGorev.id, JSON.stringify(herBirGorev))
    })

    // Görev Düzenle
    let gorevDuzenleButonu = document.createElement("button")
    gorevDuzenleButonu.className = "duzenleButonu"
    gorevDiv.appendChild(gorevDuzenleButonu)
    gorevDuzenleButonu.textContent = "✎"

    gorevDuzenleButonu.addEventListener("click", () => {
        let yeniGirdi = prompt("Görevi Düzenleyin:", girdi.value)
        gorevOlustur.textContent = yeniGirdi
        herBirGorev.isim = yeniGirdi
        localStorage.setItem(herBirGorev.id, JSON.stringify(herBirGorev))
    })

    // Tarih ekleme
    
    let tarihSpaniOlustur = document.createElement("span")
    tarihSpaniOlustur.className = "tarihDegeri"
    tarihSpaniOlustur.textContent = herBirGorev.tarih
    gorevDiv.appendChild(tarihSpaniOlustur)
      
    // Saat ekleme
    
    let saatSpaniOlustur = document.createElement("span")
    saatSpaniOlustur.className = "saatDegeri"
    saatSpaniOlustur.textContent = herBirGorev.saat
    gorevDiv.appendChild(saatSpaniOlustur)
       
}

gorevleriAl()
