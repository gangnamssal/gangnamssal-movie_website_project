# from allauth.account.adapter import DefaultAccountAdapter


# class CustomAccountAdapter(DefaultAccountAdapter):

#     def save_user(self, request, user, form, commit=False):
#         user = super().save_user(request, user, form, commit)
#         data = form.cleaned_data
#         # user.reg_no = data.get('reg_no')
#         # user.department = data.get('department')
#         # user.university = data.get('university')
#         user.prefer_genre = data.get('prefer_genre')
#         user.save()
#         return user