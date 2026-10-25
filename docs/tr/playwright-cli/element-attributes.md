---
topic: element-attributes
title: Öğe özniteliklerini okumak
source: references/element-attributes.md
upstreamCommit: b1a5903c5b633b8c9f843ad7b629c2a78437040c
---
## Ne anlatır
Snapshot, sayfadaki öğeleri rolleri ve adlarıyla gösterir ama her ayrıntıyı göstermez. Bir butonun `id` değeri, CSS sınıfları, `data-testid` gibi `data-*` öznitelikleri ya da hesaplanmış stilleri orada yer almaz. Bu kısa rehber, böyle bir bilgiye ihtiyaç duyulduğunda `eval` komutunun nasıl kullanılacağını gösterir. Claude önce snapshot alıp öğenin referansını (örneğin `e7`) bulur, sonra o öğeyi parametre olarak alan küçük bir fonksiyon çalıştırır: `el => el.id`, `el => el.className` ya da `el => el.getAttribute('aria-label')` gibi. Aynı yolla `getComputedStyle` ile bir öğenin `display` gibi stil değerleri de okunabilir. Sonuç doğrudan komut çıktısında döner, böylece sayfanın kaynak koduna bakmadan öğe hakkında eksik bilgi tamamlanmış olur.

## Ne zaman işine yarar
- Test için sabit bir seçici ararken öğenin `data-testid` değerini öğrenmek istediğinde
- Bir öğenin erişilebilirlik etiketini (`aria-label`) kontrol ederken
- Bir öğenin neden görünmediğini anlamak için hesaplanmış stiline bakarken
- Snapshot'taki bilgi bir karar vermeye yetmediğinde

## Örnek
```
Giriş sayfasındaki "Devam" butonunun data-testid değeri ne, bir bakar mısın?
```

## İlgili konular
- `test-generation`: Okunan öznitelikler kalıcı test seçicileri ve doğrulamalar kurarken işe yarar.
- `running-code`: Tek bir öznitelikten daha karmaşık sayfa sorguları için.
