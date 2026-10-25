---
skill: jira-expert
title: Jira yapılandırması ve JQL
source: skills/jira-expert/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Jira'nın teknik tarafını üstlenir: proje kurulumu, iş akışı tasarımı, JQL sorguları, dashboard'lar, otomasyon kuralları, özel alanlar, issue bağlantıları ve toplu işlemler. Paketteki bir script, "bana atanmış yüksek öncelikli buglar" gibi düz bir cümleyi doğrulanmış JQL'e çeviriyor, sorgu sonra MCP ile çalıştırılıyor. Başka bir script, iş akışı tasarımını Jira'ya girmeden önce çıkmaz ya da ulaşılamaz durumlar için kontrol ediyor. Gecikmiş işler, eskimiş kayıtlar ve sprint hızı gibi hazır sorgu örnekleri de veriyor. Issue oluşturma, alan güncelleme, durum geçişi, yorum ve iş kaydı MCP ile yapılabiliyor. Proje, sprint, filtre ve iş akışı şeması oluşturmak MCP'de yok, bunlar arayüzden ya da REST API'den yapılıyor. Toplu değişikliklerden önce filtrenin sadece hedeflenen kayıtları yakaladığını kontrol etmeni ister.

## Ne zaman kullanılır
- Karmaşık bir JQL sorgusu yazman gerektiğinde
- Yeni bir Scrum ya da Kanban projesi ve iş akışı kurarken
- Ekip ya da yönetim için dashboard hazırlarken
- Tekrarlanan işleri otomasyon kurallarına bağlamak istediğinde

## Örnek
```
Son 30 günde açılan ve hâlâ kimseye atanmamış kritik bugları bulan bir JQL yaz
```

## İlgili skill'ler
- `confluence-expert`: Jira verisini belgelere gömmek için.
- `atlassian-admin`: İzin şemaları ve kullanıcı yönetimi için.
- `scrum-master`: Sprint panosu ve hız raporları için.
