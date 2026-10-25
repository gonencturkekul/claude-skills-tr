---
topic: storage-state
title: Çerezler ve depolama durumu
source: references/storage-state.md
upstreamCommit: b1a5903c5b633b8c9f843ad7b629c2a78437040c
---
## Ne anlatır
Tarayıcının çerezlerini, localStorage ve sessionStorage verilerini yönetmeyi anlatır. `state-save` tüm durumu (çerezler ve origin bazında localStorage) bir JSON dosyasına yazar, `state-load` geri yükler. Böylece bir kez giriş yapıp sonraki oturumlarda giriş adımını atlamak mümkün olur.

Çerezler için listeleme (alan adına ya da yola göre filtreli), tek çerez okuma, `httpOnly`, `secure`, `sameSite` ve son kullanma tarihi gibi seçeneklerle çerez yazma, silme ve hepsini temizleme komutları var. localStorage ve sessionStorage için de aynı listele, oku, yaz, sil, temizle seti bulunuyor. Birden çok çerezi tek seferde eklemek, birkaç localStorage değerini aynı anda yazmak ya da IndexedDB veritabanlarını listeleyip silmek için `run-code` örnekleri verilir.

Güvenlik notları da önemli: token içeren durum dosyaları repoya eklenmemeli, `.gitignore`'a yazılmalı ve iş bitince silinmeli. Hassas veriler için ortam değişkenleri kullanılmalı. Varsayılan bellek içi oturumlar bu açıdan daha güvenli.

## Ne zaman işine yarar
- Her denemede yeniden giriş yapmak istemediğinde
- Tema ya da dil gibi kayıtlı bir tercihi değiştirip sayfanın tepkisini görmek istediğinde
- Bir hatayı belirli bir çerez ya da depolama değeriyle yeniden üretirken

## Örnek
```
Panele bir kez giriş yap, oturumu auth.json'a kaydet ve sonraki testlerde onu kullan
```

## İlgili konular
- `session-management`: Kaydedilen durumu ayrı ve yalıtılmış oturumlarda kullanmak için.
- `running-code`: Toplu çerez ve IndexedDB işlemleri için.
