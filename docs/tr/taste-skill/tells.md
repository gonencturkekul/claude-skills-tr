---
topic: tells
title: Üretilmiş görünüm işaretleri
source: references/tells.md
upstreamCommit: 6010f91a9935f1c167dfc500fb1a475681892e6b
---
## Ne anlatır
Bir sayfayı yapay zekâ üretimi gibi gösteren kalıpların tarihli listesidir. Bu kalıpların çoğu iyi fikir olarak başlamış, sebepsiz her yerde kullanıldıkça işarete dönüşmüş. Bu yüzden liste yerine geçecek bir font, renk ya da bileşen önermez; alternatif olarak bir yöntem verir. Kalıplar dalgalara ayrılır: ilk dalgada mor gradyanlar ve cam paneller, ikincide başlık üstü küçük etiketler ve hap rozetler, üçüncüde krem zemin ve terracotta vurgu gibi "sıcak ve editoryal" çözümün kendisi. Galerilerde moda olan monospace etiketler, 01/02 numaralandırma ve ince çizgiler de burada yasak. Yapı, metin ve hareket kalıpları da listelenir. `inspect.mjs` ve `lint.mjs` çoğunu yakalar: yasaklı (`banned`) bir kalıp sayfayı geçirmez, uyarı alan (`warned`) bir kalıp için gerekçe gerekir. Son not şu: kalıpları silmek yetmez, boşluğu konudan çıkan bir fikirle doldurman gerekir.

## Ne zaman işine yarar
- Sayfan "yapay zekâ yapmış" gibi duruyor ve nedenini bulamıyorsan
- `inspect.mjs` ya da `lint.mjs` bir kalıp için hata veya uyarı verdiğinde
- Krem zemin ve serif başlıkla "premium" görünme alışkanlığını sorgulamak için
- Kalıpları temizledikten sonra sayfa boş ve sıradan kaldıysa

## Örnek
```
Ajans sitem çok yapay zekâ yapmış gibi görünüyor, nedenini bulup düzelt
```

## İlgili konular
- `copy`: Metin kalıplarının ayrıntısı ve yerine ne yazılacağı orada.
- `motion`: Hareket kalıplarının açıklaması için.
- `colour`: Mor ve terracotta yerine verilen paleti kullanmak için.
