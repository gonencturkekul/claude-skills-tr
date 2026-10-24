---
topic: type
title: Tipografi kullanımı
source: references/type.md
upstreamCommit: 6010f91a9935f1c167dfc500fb1a475681892e6b
---
## Ne anlatır
Yön sayfasının verdiği tipografi sistemini nasıl kullanacağını anlatır. Çalışmadaki ölçümlere dayanır: hero başlık medyanı 72px, gövde 16px; en iyi sitelerde boyut farkı daha büyük, kalınlık ise belirleyici değil, heroların yaklaşık yarısı regular ağırlıkta. Ana fikir az sayıda ve birbirinden uzak boyut: en fazla beş adım, display boyutu masaüstünde gövdenin en az dört katı. Büyük yazı için sıkı harf aralığı, 1.0 civarı satır aralığı, `text-wrap: balance` ve optik hizalama; gövde için 45 ile 75 karakter satır uzunluğu ve 1.45 ile 1.6 satır aralığı önerir. Fontları yön sayfasındaki `<link>` ile birebir yüklemeyi, bir ya da iki aile kullanmayı ve inspector'ın göremediği hataları (yetim kelime, her şeyin kalın olması) da anlatır.

## Ne zaman işine yarar
- Sayfada birbirine yakın çok sayıda yazı boyutu varsa
- Büyük başlıklarda harfler birbirine değiyor ya da dağılıyorsa
- Font yüklenmemiş ve ekran görüntüleri yedek fontla çıkıyorsa
- Üçüncü bir font ailesi eklemeyi düşünüyorsan

## Örnek
```
Portfolyo sitemdeki başlık ve metin boyutlarını toparla, şu an hepsi birbirine çok yakın
```

## İlgili konular
- `copy`: İki satır kuralı ve karakter bütçesi başlık boyutunu belirler.
- `tells`: Dokuz yakın boyut ve varsayılan font gibi kalıplar orada.
- `critique`: Tipografiyi sayfanın genel değerlendirmesi içinde görmek için.
