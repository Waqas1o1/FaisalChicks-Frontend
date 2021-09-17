from django.http import HttpResponse

def SalesOfficer(request):

    if request.user.groups:
        groups = request.user.groups.all()
        for i in  groups:
            print(i)
            if 'salesofficer' == i.name:
                return True
    return False

          
def Accountant(request):

    if request.user.groups:
            groups = request.user.groups.all()
    for i in groups:
        if 'accountant' == i.name:
            return True
    return False




def allowed_users(allowed_roles=[]):

    def decorator(view_func):
        def wrapper_func(request, *args, **kwargs):
            group = None
            if request.user.groups.exists():
                group = request.user.groups.all()[0].name
            if group in allowed_roles:
                return view_func(request, *args, **kwargs)
            else:
                return HttpResponse('You are not authorized to view this page')
        return wrapper_func
    return decorator