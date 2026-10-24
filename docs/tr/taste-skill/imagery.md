---
topic: imagery
title: Görsel seçimi ve yerleşimi
source: references/imagery.md
upstreamCommit: 6010f91a9935f1c167dfc500fb1a475681892e6b
---
## Ne anlatır
Sayfadaki görsellerin ne olacağına, nereden bulunacağına ve nasıl yerleşeceğine karar vermeyi anlatır. Tercih sırası şöyle: projenin kendi görselleri, üretilen görseller, açık koleksiyonlardan gerçek resimler, kodla çizilen konu, dağıtılan fotoğraflar ve en son yalnız tipografi ile renk. `scripts/assets.mjs` Openverse, Wikimedia Commons ve iki müzeden lisanslı görsel ve video arar, indirir ve kredileri kaydeder. Bulunan resim asla müşterinin kendi ürünü gibi sunulmaz. Kırpma, az sayıda oran, köşesiz kenarlar, tek işlem (dokunulmamış, gri tonlu ya da multiply), metin üstü kontrast ve video kuralları da burada. Son bölüm görsellerin sayfada nereye gideceğini ve hangi yerleşimlerin güçlü sitelerde öne çıktığını ölçümlerle verir.

## Ne zaman işine yarar
- Elinde gerçek fotoğraf yoksa ve gri kutu koymak istemiyorsan
- Konuya ait arşiv fotoğrafı, harita ya da gravür arıyorsan
- Görsel oranlarını ve yerleşimlerini tutarlı kurmak istiyorsan
- Arka plan videosunu hafif ve erişilebilir eklemek istiyorsan

## Örnek
```
Gent'teki fırınımın sitesi için görsel bul, kendi fotoğrafım yok
```

## İlgili konular
- `layout`: Görsellerin oturduğu ızgara ve boşluk için.
- `motion`: Video ve kaydırmayla büyüyen çerçeveler için.
- `research`: Buradaki sayıların geldiği çalışma için.
