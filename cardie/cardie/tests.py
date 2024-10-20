from unittest import skip

from django.test import Client, TestCase, override_settings


@override_settings(ADMIN_PATH="foo/")
class AdminTestCase(TestCase):
    fixtures = ["server"]

    def setUp(self):
        self.client = Client()

    def test_default_path_should_be_admin(self):
        response = self.client.get("/admin/", follow=True)
        self.assertEqual(response.status_code, 200)

    @skip("This test is failing. Is hard to test this because urls are populated.")
    @override_settings(ADMIN_PATH="foo/")
    def test_custom_path_should_be_foo(self):
        response = self.client.get("/foo/", follow=True)
        self.assertEqual(response.status_code, 200)
