export const initialAnnouncements = [
  {
    id: 1,
    title: 'Girişimcilik Zirvesi 2026',
    date: '12 Mayıs 2026',
    description: 'Yılın en büyük girişimcilik etkinliklerinden biri olan zirveye kayıtlar başladı!',
    department: 'İŞLETME',
    committee: 'ORGANİZASYON',
    participants: 0
  },
  {
    id: 2,
    title: 'Yeni Nesil Veri Analizi Eğitimi',
    date: '18 Mayıs 2026',
    description: 'Büyük veriyi anlama ve Python araçlarıyla modelleme eğitimi verilecektir.',
    department: 'YBS',
    committee: 'ARGE',
    participants: 0
  },
  {
    id: 3,
    title: 'Dış Ticaret Semineri',
    date: '20 Mayıs 2026',
    description: 'Sektörün önde gelen isimlerinden e-ihracatın güncel dinamiklerini dinliyoruz.',
    department: 'UTİ',
    committee: 'SOSYAL SORUMLULUK',
    participants: 0
  },
  {
    id: 4,
    title: 'Kariyer Fuarı Medya Stratejisi Ortak Toplantısı',
    date: '22 Mayıs 2026',
    description: 'Tüm departmanların topluluk üyeleriyle ortak sosyal medya stratejisi belirleme etkinliği.',
    department: 'TÜMÜ',
    committee: 'SOSYAL MEDYA',
    participants: 0
  },
  {
    id: 5,
    title: 'Bahar Şenlikleri Sponsorluk Görüşmeleri',
    date: '25 Mayıs 2026',
    description: 'Sponsorluk komitemizin markalarla gerçekleştirdiği açık görüşme teknikleri eğitimi.',
    department: 'İŞLETME',
    committee: 'SPONSORLUK',
    participants: 0
  }
];

export const initialJobs = [
  {
    id: 1,
    title: 'Yazılım Geliştirici Stajyeri',
    company: 'TechCorp A.Ş.',
    location: 'İstanbul',
    type: 'Staj',
    requirements: ['React veya Vue.js bilgisi', 'RESTful API deneyimi', 'Git kullanımı'],
    description: 'TechCorp bünyesinde yazılım geliştirme süreçlerine dahil olmak ve modern web teknolojileri (React, Node.js) kullanarak projelere katkı sağlamak üzere takım arkadaşları arıyoruz.'
  },
  {
    id: 2,
    title: 'Pazarlama Uzman Yardımcısı',
    company: 'Global Medya',
    location: 'Ankara',
    type: 'Tam Zamanlı',
    requirements: ['Dijital pazarlama araçlarına hakimiyet', 'İyi derecede İngilizce', 'İletişim becerisi'],
    description: 'Markalarımızın sosyal medya iletişim stratejilerinin oluşturulması, trend analizi yapılması ve dijital kampanya performanslarının raporlanması süreçlerinde aktif görev alacaksınız.'
  },
  {
    id: 3,
    title: 'Veri Analisti Stajyeri',
    company: 'DataBrain',
    location: 'İzmir',
    type: 'Staj',
    requirements: ['İyi derecede SQL', 'Python ile Veri Analizi (Pandas, Numpy)', 'Tercihen PowerBI veya Tableau bilgisi'],
    description: 'Müşteri verilerinin temizlenmesi, anlamlandırılması ve yönetim raporlarının görselleştirilmesi konularında Veri Bilimi departmanımıza destek olacak stajyer arıyoruz.'
  }
];

export const initialNotes = [
  {
    id: 1,
    title: 'Veri Yapıları Final Özeti',
    course: 'Veri Yapıları',
    uploader: 'Ali Yılmaz',
    date: '2 gün önce',
    type: 'PDF'
  },
  {
    id: 2,
    title: 'İşletme Ekonomisi Vize Soruları',
    course: 'Ekonomi Yönetimi',
    uploader: 'Ayşe Kaya',
    date: '1 hafta önce',
    type: 'Görsel'
  },
  {
    id: 3,
    title: 'Sistem Analizi Tasarım Şablonları',
    course: 'Sistem Analizi',
    uploader: 'Canan Demir',
    date: '3 hafta önce',
    type: 'PDF'
  }
];

export const initialTalkPosts = [
  {
    id: 1,
    authorName: 'Mehmet Özveri',
    authorTitle: '2020 Mezunu / Yazılım Mühendisi',
    content: 'Sektördeki ilk senemde şunu öğrendim: En önemli beceri iletişim ve İngilizce. Algoritma elbette önemli ama ekip içi uyum her zaman projeyi kurtarıyor.',
    likes: 0,
    likedBy: [], 
    comments: []
  },
  {
    id: 2,
    authorName: 'Zeynep Ak',
    authorTitle: '2015 Mezunu / İK Yöneticisi',
    content: 'Yeni mezun arkadaşların özgeçmişlerinde en çok dikkat ettiğimiz şey takım çalışmaları ve gönüllü projelerde yer alıp almadıklarıdır. Herkese mülakatlarda başarılar!',
    likes: 0,
    likedBy: [], 
    comments: []
  }
];

export const guideRoadmaps = [
  {
    id: 'YBS',
    title: 'Yönetim Bilişim Sistemleri (YBS)',
    paths: [
      {
        pathTitle: 'Veri Bilimi ve İş Zekası',
        techs: ['Python', 'SQL', 'PowerBI', 'Tableau', 'Excel İleri'],
        desc: 'Ham veriyi temizleyip anlamlandırarak şirket yönetimine stratejik içgörüler sunan uzmanlık alanı.'
      },
      {
        pathTitle: 'Yazılım Geliştirme (Mühendislik)',
        techs: ['Java', 'C#', 'React', 'Node.js', 'Git'],
        desc: 'Kurumsal uygulamalar ve son kullanıcı ürünleri tasarlayan, geliştiren mimari yönü ağır rota.'
      },
      {
        pathTitle: 'Sistem Analizi ve Proje Yönetimi',
        techs: ['Agile/Scrum', 'UML', 'Jira', 'BPMN'],
        desc: 'Teknik-İş ekipleri arası köprüyü kuran, projenin başından sonuna gereksinimleri planlayan lider profili.'
      }
    ]
  },
  {
    id: 'UTİ',
    title: 'Uluslararası Ticaret ve İşletmecilik (UTİ)',
    paths: [
      {
        pathTitle: 'Dış Ticaret Uzmanlığı',
        techs: ['İthalat/İhracat Mevzuatı', 'Akreditif Bilgisi', 'Gümrük Sistemleri'],
        desc: 'Şirketlerin küresel pazarda ticaret operasyonlarını yöneten ve yasal süreçleri yürüten alan.'
      },
      {
        pathTitle: 'Tedarik Zinciri ve Lojistik Yönetimi',
        techs: ['SAP MM', 'Oracle SCM', 'İleri Excel'],
        desc: 'Ürünün ham maddeden son kullanıcıya ulaşana kadar olan uçtan uca akışını optimize eden bölüm.'
      }
    ]
  },
  {
    id: 'İŞLETME',
    title: 'İşletme',
    paths: [
      {
        pathTitle: 'Dijital Pazarlama ve Marka Yönetimi',
        techs: ['Google Analytics', 'SEO / SEM', 'Meta Ads', 'CRM Araçları'],
        desc: 'Hedef kitle araştırmaları sonucunda yaratıcı stratejilerle markanın dijital varlığını güçlendiren saha.'
      },
      {
        pathTitle: 'Finans ve Muhasebe',
        techs: ['Bloomberg Terminali', 'SPK Lisansları', 'Mali Tablo Analizi'],
        desc: 'Şirketlerin nakit akışını, bütçelerini ve yatırım kararlarını yöneten sayısal analiz alanı.'
      },
      {
        pathTitle: 'İnsan Kaynakları Yönetimi',
        techs: ['Performans Sistemleri', 'İşe Alım Metrikleri', 'Mülakat Teknikleri'],
        desc: 'Şirketin en önemli değeri olan çalışanların yönetilmesi, yetenek kazanımı ve kurum kültürü inşası.'
      }
    ]
  }
];
