---
skill: systematic-debugging
title: Sistematik hata ayıklama
source: skills/systematic-debugging/SKILL.md
upstreamCommit: 2ce8aa15d05bd57213e6f746f953aafb7ded7a8b
---
## Ne yapar
Bir hata, başarısız test ya da beklenmedik davranışla karşılaşıldığında düzeltme önermeden önce kök nedeni bulmayı zorunlu kılar. Dört aşaması var. Kök neden araştırmasında hata mesajları ve stack trace dikkatle okunur, sorun güvenilir şekilde tekrar üretilir, son değişikliklere bakılır, çok bileşenli sistemlerde her sınıra teşhis logları eklenip sorunun hangi katmanda koptuğu bulunur. Örüntü analizinde aynı kod tabanındaki çalışan benzer örnekler bulunup farklar listelenir. Hipotez aşamasında tek bir net hipotez kurulur ve tek değişkenle en küçük değişiklikle test edilir. Uygulamada önce sorunu yeniden üreten başarısız bir test yazılır, sonra tek bir düzeltme yapılır. Üç düzeltme denemesi başarısız olursa dördüncüyü denemek yerine mimari sorgulanır ve seninle konuşulur. Kök nedeni geriye doğru izleme, katmanlı doğrulama ve sabit bekleme yerine koşula dayalı bekleme gibi destek teknikleri içerir.

## Ne zaman kullanılır
- Bir test, build ya da entegrasyon beklenmedik şekilde kırıldığında
- Zaman baskısı altında hızlı bir yama cazip geldiğinde
- Daha önce denenen düzeltmeler işe yaramadığında
- Sorunu tam olarak anlamadığını hissettiğinde

## Örnek
```
CI'da imzalama adımı sadece main dalında başarısız oluyor, nedenini bul
```

## İlgili skill'ler
- `test-driven-development`: Düzeltmeden önceki başarısız testi yazmak için.
- `verification-before-completion`: "Düzeldi" demeden önce kanıt için.
- `dispatching-parallel-agents`: Birden çok bağımsız hata varsa.
