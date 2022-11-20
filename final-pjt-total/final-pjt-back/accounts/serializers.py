from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers
from django.conf import settings

# from allauth.account.adapter import get_adapter
# from allauth.account.utils import setup_user_email

from dj_rest_auth.registration.serializers import RegisterSerializer


class CustomRegisterSerializer(RegisterSerializer):
    # reg_no = serializers.CharField(max_length=10)
    # department = serializers.CharField(required=True, max_length=5)
    # university = serializers.CharField(required=True, max_length=100)
    prefer_genre = serializers.CharField(max_length=150, required=False)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        # data_dict['reg_no'] = self.validated_data.get('reg_no', '')
        # data_dict['department'] = self.validated_data.get('department', '')
        # data_dict['university'] = self.validated_data.get('university', '')
        data_dict['prefer_genre'] = self.validated_data.get('prefer_genre', '')
        return data_dict


class CustomUserDetailsSerializer(UserDetailsSerializer):

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + \
            ('prefer_genre',)
            # ('reg_no', 'is_staff', 'department', 'university',)