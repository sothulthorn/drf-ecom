from rest_framework import viewsets
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from .models import Order
from .serializers import OrderSerializer

# Create your views here.
def validate_user_session(id, token):
  UserModel = get_user_model()
  
  try:
    user = UserModel.objects.get(pk=id)
    if user.session_token == token:
      return True
    return False
  except UserModel.DoesNotExist:
    return False
  
@csrf_exempt
def add(request, id, token):
  if not validate_user_session(id, token):
    return JsonResponse({'error': 'Please re-login', 'code': '1'})
  
  if request.method == 'POST':
    user_id = id
    transaction_id = request.POST['transaction_id']
    amount = request.POST['amount']
    products = request.POST['products']
    
    total_prods = len(products.split(',')[:-1])
    
    UserModel = get_user_model()
    
    try:
      user = UserModel.objects.get(pk=user_id)
    except UserModel.DoesNotExist:
      return JsonResponse({'error': 'User does not exist'})
    
    order = Order(user=user, product_names=products, total_products=total_prods, transaction_id=transaction_id, total_amount=amount)
    order.save()
    return JsonResponse({'success': True, 'error': False, 'msg': 'Order placed successfully'})
  
class OrderViewsets(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('id')
    serializer_class = OrderSerializer