KodGaraj Ekibi Merhaba!

Ben Buğra, nodejs tecrübem olmasa da
bana sizinle çalışabilme olanağı sunduğunuz için 
teşekkür ederim.
Projenin back-end inde kullanılması beklenen bütün kütüphaneleriyle
çalıştım ve postman ile projenin çalışmayan hiçbir requesti yok şuanda
ve tüm kodlarımda mümkün olduğunca JS ES6 versiyonunda çalıştım.

Daha önce MongoDB ile çalışmamıştım. Bu nedenle ilk baktığım 
kaynağın mongoDB ATLAS a yönlendirmesi sonucu mongoose kütüphanesi
ile internet ortamındaki mongoDB collectionlarından çalıştım.
İşlemlerin gerçekleşip gerçekleşmediğini gösterebilmek için
giriş bilgilerini aşağıda paylaşacağım.

Yaptığım araştırmalarda mongoDB de kısa yoldan CASCADE Delete 
işlemi bulamadım ve hem bu işlemi yapabilmek hem de her ürünün 
ait olabileceği categori id numarasının birleştirilmesi için 
ek bir tablo ürettim. Bu tablo sayesinde yeni sorgular da
geliştirilebilir diye düşünüyorum.

DEL requestlerinde hangi model silinirse silinsin, oluşturduğum
3. tablodadaki bağlantılı verileri de siliniyor. Herhangi bir 
productID ile bağlantısı olmayan categoriyi daha sonra ekleme
yapılabilir diye silmedim. Category bilgisini değiştirirken
category name değerine mevcut durumda var olan olan bir categori
yazılırsa hata vererek işlemden çıkmasını sağladım.
Aynı durum product name için de geçerli.

POSTMAN ile hazırladığım api koleksiyonlarını repositorye postman_collection
uzantılı dosyayla yükledim.

İşin back-end kısmında eksik kalmasını istemediğim için frontu geliştirmekten
bir adım uzakta dursam da back-end bittikten sonra giriş yaptım.
Front işlemlerini back-end ten ayrı tutarak iki ayrı proje ile 
serverlerı ayaklandırıp axios ile requestleri yapmaya çalıştım.
Vuetify kütüphanesi ile küçük çapta bir arayüz hazırladım. Vue-Router ile
sayfa geçişleri başlangıç seviyesinde şuanda. "/register" route ile 
back-ende post request gönderdim ve çalışıyor.

Şuanda bu haliyle gönderebildiğim için bile çok mutluyum.
Bunu sizlerle paylaşmaktan da onur duyuyorum.
Tekrar görüşmek üzere,
En iyi dileklerimle...






