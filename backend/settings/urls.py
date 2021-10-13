from django.contrib import admin
from django.urls import path, include
from django.conf import settings 
from django.conf.urls.static import static 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('apis/', include('app.urls')),
    path('auth/', include('authentications.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)