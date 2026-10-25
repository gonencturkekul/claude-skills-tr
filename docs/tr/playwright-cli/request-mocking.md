---
topic: request-mocking
title: Ağ isteklerini taklit etmek
source: references/request-mocking.md
upstreamCommit: b1a5903c5b633b8c9f843ad7b629c2a78437040c
---
## Ne anlatır
Sayfanın yaptığı ağ isteklerini yakalamayı, sahte yanıt döndürmeyi, değiştirmeyi ve engellemeyi anlatır. Basit durumlar için `route` komutu yeterli: bir URL kalıbına özel bir durum kodu, JSON gövde, içerik türü ya da ek başlık verilebilir, isteklerden `cookie` gibi başlıklar silinebilir. `route-list` etkin kuralları gösterir, `unroute` bir kuralı ya da hepsini kaldırır. URL kalıplarında `**` ve `*` joker karakterleri, `{png,jpg}` gibi uzantı grupları ve sorgu parametreleri kullanılabilir.

Daha ince işler için `run-code` ile Playwright'ın `page.route` API'si kullanılır. Rehber dört örnek verir: istek gövdesine bakıp farklı yanıt döndürmek (örneğin yalnızca admin girişine token vermek), gerçek yanıtı alıp içindeki bir alanı değiştirmek, bağlantı reddedildi ya da zaman aşımı gibi ağ hatalarını taklit etmek ve yanıtı birkaç saniye geciktirmek.

## Ne zaman işine yarar
- Backend hazır değilken arayüzü sahte verilerle denemek istediğinde
- Hata ve boş durum ekranlarının nasıl göründüğünü kontrol ederken
- Yavaş ağda yükleme durumlarını test etmek istediğinde
- Görselleri ya da üçüncü taraf script'leri engelleyip sayfayı sadeleştirirken

## Örnek
```
/api/users isteği 500 dönerse liste sayfası ne gösteriyor, mock'layıp ekran görüntüsünü al
```

## İlgili konular
- `running-code`: Gelişmiş taklit senaryolarında kullanılan `run-code` komutunun kuralları.
- `test-generation`: Test yazarken keşif sırasında istekleri taklit etmek için.
