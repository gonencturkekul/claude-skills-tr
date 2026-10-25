---
skill: rag-architect
title: RAG hattı tasarımı ve ölçümü
source: skills/rag-architect/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Üretime gidecek bir RAG hattını tasarlar, ayarlar ve ölçer. Kararları sezgiyle değil, üç Python aracıyla gerçek veri üzerinde verir. Önce `chunking_optimizer.py` belge yığınını analiz edip bir parçalama stratejisi önerir ve örnek parçalar gösterir. Ardından `rag_pipeline_designer.py` doküman sayısı, sorgu hacmi, gecikme, bütçe ve doğruluk önceliği gibi gereksinimlerden embedding, vektör veritabanı, retrieval ve reranking seçimlerini, maliyet tahminini ve bir mermaid mimari diyagramını üretir. Son olarak `retrieval_evaluator.py` precision@k, recall@k, MRR ve NDCG ölçer. Hedef tutmazsa her seferinde tek bir değişkeni değiştirip ölçümü tekrarlar. Model adlarını ve fiyatları güncel gerçek gibi sunmaz; bir kademe önerir ve fiyatı sağlayıcının sayfasından doğrulamanı ister.

## Ne zaman kullanılır
- Dokümanların için bir RAG sistemi kurmak istediğinde
- Hangi chunk boyutunu veya embedding modelini seçeceğine karar veremediğinde
- Vektör veritabanı seçerken ölçütleri netleştirmek için
- Mevcut retriever'ını elindeki doğru cevaplarla ölçmek istediğinde

## Örnek
```
Destek dokümanlarımız için bir RAG hattı tasarla ve retrieval kalitesini ölç
```

## İlgili skill'ler
- `agent-designer`: Retrieval kullanan bir ajan sistemi kuracaksan.
- `spec-driven-workflow`: RAG özelliğini önce bir spesifikasyona dökmek için.
- `observability-designer`: Canlıdaki hattı izlemek için.
