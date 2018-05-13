from rest_framework.pagination import (
  PageNumberPagination
)

class GetPageNumberPagination(PageNumberPagination):
  page_size = 12