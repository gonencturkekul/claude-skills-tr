---
skill: minimalist
title: Gereksiz kod yazmama disiplini
source: minimalist/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Bir problemi mümkün olan en az kodla çözmek için Claude'a sıkı bir verimlilik merdiveni uygulatır. Yeni kod yazmadan önce sırayla sorar: buna gerçekten ihtiyaç var mı, kod tabanında zaten var mı, standart kütüphane ya da platformun kendisi bunu yapıyor mu, kurulu bir bağımlılık çözüyor mu, tek satırda olur mu. Ancak hepsi boşa çıkarsa en kısa çalışan kodu yazar. İstenmemiş soyutlamalar, tek satırlık işler için paket kurmak, tek fonksiyonluk sınıflar ve gereksiz boilerplate yasak. Karmaşık isteklerde "gerçekten X'e mi ihtiyacın var, Y yetmez mi" diye sorar ve hangi yolu seçtiğini açıkça söyler. İstenmediği sürece yorum, log ya da hata yönetimi eklemez; bu yüzden ekibinin yorum kuralları varsa bunu açıkça belirtmen gerekir.

## Ne zaman kullanılır
- Claude'un fazla mühendislik yaptığını düşündüğünde
- Bağımlılık sayısını düşük tutmak istediğinde
- Küçük bir değişiklik için en kısa diff'i istiyorsan
- Gelecek için yazılmış soyutlamalardan kaçınmak istediğinde

## Örnek
```
/engineering-advanced-skills:minimalist bir CSV dosyasındaki tekrar eden satırları temizleyen bir fonksiyon yaz
```

## İlgili skill'ler
- `strict-api`: Minimal kod yazarken var olmayan API'lerin uydurulmasını engellemek için birlikte kullanılır.
- `tech-debt-tracker`: Zaten birikmiş gereksiz karmaşıklığı bulmak için.
