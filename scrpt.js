// ======================================
// 🔐 BAGIAN LOGIN — untuk login.html
// ======================================
const formLogin = document.getElementById("formLogin");
if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();
        const user = document.getElementById("username").value.trim();
        const pass = document.getElementById("password").value.trim();
        const pesan = document.getElementById("pesanSalah");

        // Data akun — bisa diubah
        const akun = {
            username: "admin",
            password: "admin123"
        };

        if (user === akun.username && pass === akun.password) {
            localStorage.setItem("sudahLogin", "true");
            localStorage.setItem("userAktif", user);
            window.location.href = "aplikasi.html";
        } else {
            pesan.textContent = "❌ Username atau password salah!";
        }
    });
}

// ======================================
// 📊 BAGIAN APLIKASI — untuk aplikasi.html
// ======================================
if (window.location.pathname.includes("aplikasi.html")) {

    // Tampilkan nama pengguna
    const namaUser = localStorage.getItem("userAktif") || "Pengguna";
    const elNamaUser = document.getElementById("namaPengguna");
    if (elNamaUser) elNamaUser.textContent = "👤 " + namaUser;

    // Fungsi Logout
    const tombolKeluar = document.getElementById("tombolKeluar");
    if (tombolKeluar) {
        tombolKeluar.addEventListener("click", function () {
            localStorage.removeItem("sudahLogin");
            localStorage.removeItem("userAktif");
            window.location.href = "login.html";
        });
    }

    // Tampilkan tanggal & waktu
    function updateWaktu() {
        const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const d = new Date();
        const waktuEl = document.getElementById("waktuSekarang");
        if (waktuEl) {
            waktuEl.textContent = `${hari[d.getDay()]}, ${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}, ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
        }
    }
    updateWaktu();
    setInterval(updateWaktu, 60000);

    // Tab Menu
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabBadan = document.querySelectorAll(".tab-badan");
    tabLinks.forEach(tombol => {
        tombol.addEventListener("click", function () {
            const tabId = this.getAttribute("data-tab");
            tabLinks.forEach(b => b.classList.remove("aktif"));
            tabBadan.forEach(c => c.classList.add("tersembunyi"));
            this.classList.add("aktif");
            document.getElementById(tabId).classList.remove("tersembunyi");
        });
    });

    // Simpan Pengaturan
    const btnSimpan = document.getElementById("simpanPengaturan");
    if (btnSimpan) {
        btnSimpan.addEventListener("click", function () {
            const totalSlot = document.getElementById("totalSlot").value;
            localStorage.setItem("totalSlot", totalSlot);
            document.getElementById("sisaSlot").textContent = totalSlot - parseInt(document.getElementById("jmlParkir").textContent);
            alert("✅ Pengaturan tersimpan!");
        });
    }

    // Ambil pengaturan yang tersimpan
    const simpanTotalSlot = localStorage.getItem("totalSlot");
    if (simpanTotalSlot) {
        document.getElementById("totalSlot").value = simpanTotalSlot;
        document.getElementById("sisaSlot").textContent = simpanTotalSlot - parseInt(document.getElementById("jmlParkir").textContent);
    }

    // Form Kendaraan Masuk
    const formMasuk = document.getElementById("formMasuk");
    if (formMasuk) {
        formMasuk.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const plat = document.getElementById("platNomor").value;
            const jenis = document.getElementById("jenisKendaraan").value;
            const catatan = document.getElementById("catatan").value;

            // Buat kode tiket otomatis
            const kodeTiket = "PKR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
            
            // Waktu sekarang
            const sekarang = new Date();
            const waktuMasuk = `${sekarang.getDate()}/${sekarang.getMonth()+1}/${sekarang.getFullYear()}, ${String(sekarang.getHours()).padStart(2,'0')}:${String(sekarang.getMinutes()).padStart(2,'0')}`;

            // Tambahkan ke tabel
            const tbody = document.getElementById("daftarKendaraan");
            const barisBaru = document.createElement("tr");
            
            let biayaAwal = "Rp 0";
            barisBaru.innerHTML = `
                <td>${kodeTiket}</td>
                <td>${plat}</td>
                <td><span class="label-truk">${jenis}</span></td>
                <td>${waktuMasuk}</td>
                <td>${biayaAwal}</td>
                <td>
                    <button class="btn-keluar">Keluar</button>
                    <button class="btn-tiket">Tiket</button>
                </td>
            `;
            tbody.insertBefore(barisBaru, tbody.firstChild);

            // Update angka ringkasan
            const jmlSekarang = parseInt(document.getElementById("jmlParkir").textContent) + 1;
            document.getElementById("jmlParkir").textContent = jmlSekarang;
            
            const totalSlot = parseInt(document.getElementById("totalSlot").value);
            document.getElementById("sisaSlot").textContent = totalSlot - jmlSekarang;

            // Reset form
            formMasuk.reset();
            alert("✅ Kendaraan tercatat masuk!\nNomor Tiket: " + kodeTiket);
        });
    }

    // Fungsi Cari Kendaraan
    const cariInput = document.getElementById("kotakCari");
    if (cariInput) {
        cariInput.addEventListener("input", function () {
            const kataKunci = this.value.toLowerCase();
            const semuaBaris = document.querySelectorAll("#daftarKendaraan tr");
            semuaBaris.forEach(baris => {
                const teksBaris = baris.textContent.toLowerCase();
                if (teksBaris.includes(kataKunci)) {
                    baris.style.display = "";
                } else {
                    baris.style.display = "none";
                }
            });
        });
    }
}