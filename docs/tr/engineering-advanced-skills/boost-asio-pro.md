---
skill: boost-asio-pro
title: Boost.Asio ile asenkron C++ ağ kodu
source: boost-asio-pro/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Boost.Asio ya da bağımsız Asio ile asenkron C++ ağ kodu yazarken ve incelerken kullanılır. Asio'nun API'si yıllar içinde üç kez biçim değiştirdi ve internetteki örneklerin çoğu eski döneme ait. Bu yüzden skill önce senin kullandığın Boost sürümünü ve C++ standardını belirler, sonra ona uyan stili seçer: C++20 coroutine'leri, callback tabanlı klasik stil, `asio::spawn` ile stackful yaklaşım ya da çok eski sürümler için `io_service`. Hangi özelliğin hangi Boost sürümünden itibaren derlendiğini gösteren bir tablo da var. Sık yapılan hataları açıkça anlatır: strand yazmaları sıraya koymaz, buffer belleğin sahibi değildir, bağlantı nesnesi handler'lardan uzun yaşamalıdır. Bitirmeden önce kontrol listesiyle kodu gözden geçirir ve derlemeni ister.

## Ne zaman kullanılır
- TCP ya da UDP sunucu ve istemcisi yazarken
- SSL/TLS, timer ya da strand kullanan bir kodu incelerken
- Eski bir dağıtımdaki Boost sürümüyle derlenmesi gereken kod yazarken
- Aynı sokete eşzamanlı yazmalarda veri karışması gibi sorunları ararken

## Örnek
```
Debian bookworm'daki Boost 1.74 ile derlenecek, uzunluk önekli mesajlar kullanan bir TCP sunucusu yaz
```

## İlgili skill'ler
- `chaos-engineering`: Yarı açık soket, zaman aşımı gibi hata yollarını bilinçli olarak denemek için.
- `performance-profiler`: Sunucunun darboğazlarını ölçmek için.
- `strict-api`: Kullandığın sürümde gerçekten var olmayan API'leri çağırmamak için.
