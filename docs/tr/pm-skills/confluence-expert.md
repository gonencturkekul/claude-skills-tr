---
skill: confluence-expert
title: Confluence alanları ve belgeleme
source: skills/confluence-expert/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Confluence'ta bilgi yönetimini kurar: alan türünü seçmek, en fazla üç seviyeli bir sayfa ağacı tasarlamak, izinleri ayarlamak, şablon hazırlamak ve içeriği zaman içinde düzenli tutmak. Bir script, ekip bilgisinden önerilen sayfa hiyerarşisini çıkarıyor ve bu plan MCP ile sayfa sayfa oluşturuluyor. Başka bir script, sayfa envanterini tarayıp eskimiş, sahipsiz ve az okunan sayfaları buluyor. Bilgi kutusu, içindekiler, Jira sorgusu ve görev listesi gibi makroların ne işe yaradığını anlatır, gözden geçirme sıklıkları ve arşivleme kuralları önerir. Alan oluşturma, sayfa silme, etiket ve izin ayarları MCP'de olmadığından bunlar için arayüzü ya da REST API'yi gösterir.

## Ne zaman kullanılır
- Yeni bir ekip ya da proje için Confluence alanı kurarken
- Dağınık bir bilgi tabanını yeniden düzenlemeden önce içerik denetimi yapmak için
- Sayfalara canlı Jira raporları gömmek istediğinde
- Belgeleme standartları ve gözden geçirme döngüsü belirlerken

## Örnek
```
Mobil ekip için Confluence alanı kurmam lazım, 8 kişiyiz ve iki projemiz var, sayfa yapısını öner
```

## İlgili skill'ler
- `jira-expert`: Sayfalara Jira sorguları ve grafikleri bağlamak için.
- `atlassian-templates`: Alan içinde kullanılacak hazır şablonlar için.
- `atlassian-admin`: Alanlar arası izinler ve kuruluş geneli ayarlar için.
