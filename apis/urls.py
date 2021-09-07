from django.urls import path, include
from rest_framework import routers
from apis import views
router = routers.DefaultRouter()
router.register("Party", views.PartyViewSet, basename="Party")
router.register("SalesOfficer", views.SalesOfficerViewSet, basename="SalesOfficer")
router.register("Category", views.CategoryViewSet, basename="Category")
router.register("Product", views.ProductViewSet, basename="Product")
router.register("DiscountCategory", views.DiscountCategoryViewSet, basename="DiscountCategory")
router.register("PartyOrder", views.PartyOrderViewSet, basename="PartyOrder")
router.register("Recovery", views.RecoveryViewSet, basename="Recovery")

urlpatterns = [
    path('', include(router.urls))
]
