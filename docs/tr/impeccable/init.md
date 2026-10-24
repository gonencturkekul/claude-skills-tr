---
command: init
title: Proje bağlamını kurma
source: reference/init.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Projeyi impeccable için hazırlar ve kalıcı ürün bilgisini PRODUCT.md dosyasına yazar: kullanıcılar, ürünün amacı, konumlandırma, marka taahhütleri, platform, stack ve erişilebilirlik gibi. Önce repoyu tarar, sonra eksik kalan konularda en fazla üçer soruluk turlarla sana sorar. Görsel dünya icat etmez ve DESIGN.md yazmaz. Çalıştırılabilir web projelerinde live mode ayarını da hazırlayabilir, sonunda projenin durumuna göre sıradaki komutu önerir.

## Ne zaman kullanılır
- Yeni bir projede impeccable'ı ilk kez kullanırken (proje başına bir kez yeterli).
- PRODUCT.md eskidiğinde ya da eksik bilgiler olduğunda güncellemek için.
- Diğer komutlar PRODUCT.md'yi okuyarak çalıştığı için, büyük tasarım işlerinden önce.

## Örnek
```
/impeccable init
```

## İlgili komutlar
- `document`: Mevcut görsel sistemi DESIGN.md olarak kaydeder.
- `shape`: Belirli bir ekran için uygulama öncesi brief çıkarır.
- `live`: Tarayıcıda görsel varyantlarla denemeye başlar.
