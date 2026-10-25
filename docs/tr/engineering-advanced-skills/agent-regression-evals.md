---
skill: agent-regression-evals
title: Ajan değişiklikleri için regresyon testleri
source: skills/agent-regression-evals/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Bir ajanın prompt'unu, modelini ya da araçlarını değiştirdiğinde ajanın kötüleşmediğini istatistikle kanıtlar. Ajanlar her çalışmada farklı sonuç verdiği için tek denemeyle karar vermez: her vakayı en az üç kez çalıştırmanı ister. Üç script var. İlki ajanın çağırdığı araçların yolunu notlar ve yasaklı bir araç çağrısında işi durdurur. İkincisi kararsız (flaky) vakaları ayırır, pass@k ve pass^k değerlerini raporlar. Üçüncüsü aday sürümü vaka vaka eski sürümle karşılaştırır ve anlamlı bir düşüş, kritik bir vakada gerileme ya da eksik bir vaka gördüğünde merge'ü engeller. Başarısız vakayı silip yeşile dönmek de sayılmaz, karantinaya alınan her vakanın bir sahibi ve son tarihi olmalı. Script'ler API ya da LLM çağırmaz, sadece senin topladığın sonuçları değerlendirir.

## Ne zaman kullanılır
- Prompt ya da model değişikliğinden sonra başarı oranı düştüğünde, düşüşün gerçek mi gürültü mü olduğunu anlamak için
- Ajanın doğru cevaba yanlış araçlarla ulaşıp ulaşmadığını kontrol ederken
- Merge'ü engelleyen bir eval kapısını CI'ya bağlamak istediğinde

## Örnek
```
/engineering-advanced-skills:agent-regression-evals baseline.jsonl candidate.jsonl
```

## İlgili skill'ler
- `agent-designer`: Test ettiğin ajan sistemini tasarlamak için.
- `self-eval`: Tek bir oturumdaki işi puanlamak için, istatistiksel karşılaştırma yerine.
- `ci-cd-pipeline-builder`: Eval kapısını çalıştıracak pipeline'ı kurmak için.
