---
topic: scenes
title: Kaydırma sahneleri
source: references/scenes.md
upstreamCommit: 6010f91a9935f1c167dfc500fb1a475681892e6b
---
## Ne anlatır
Sayfanın akılda kalan büyük anlarını anlatır: kaydırırken sahnesi `position: sticky` ile yerinde duran ve GSAP zaman çizelgesinin kaydırmayla ilerlediği uzun bölümler. Bir fotoğrafın pencereden tam ekrana büyümesi ya da kameranın resimler arasında uçması gibi. Sahneyi kurmayı (`assets/scenes/stage.css`, `stage.js` ve sahnenin kendi dosyaları), içini aynı aileden gerçek fotoğraflarla ve kısa cümlelerle doldurmayı, sayfanın token'larına uydurmayı anlatır. Telefon planı, azaltılmış hareket ve script çalışmadığında görünen bitmiş kompozisyonun da ayrıca tasarlanmasını ister. Kurallar net: sayfa başına iki üç sahne, aralarında sakin bir bölüm, sadece doğal kaydırma, tekerlek yakalama yok. `library/scenes.json` henüz gelmediği için şimdilik sahneyi aynı stage üzerinde kendin kurarsın ve `scenes.mjs` ile kare kare kontrol edersin.

## Ne zaman işine yarar
- Sayfan düzgün ama düz bölümlerden ibaretse ve akılda kalan bir an istiyorsan
- Bir ürünün, rotanın ya da mekanın hikayesini kaydırmayla anlatmak istediğinde
- Sahne telefonda ya da azaltılmış harekette bozuluyorsa
- Var olan bir sahneyi kare kare kontrol etmek istediğinde

## Örnek
```
Mimarlık ofisimin sitesine projeler arasında kaydırdıkça ilerleyen bir sahne ekle
```

## İlgili konular
- `motion`: Sahne dışındaki sakin hareketin sınırları orada.
- `imagery`: Sahneyi dolduracak gerçek fotoğrafları bulmak için.
- `copy`: Sahnedeki kısa cümleler ve iki satırlık başlık kuralı için.
