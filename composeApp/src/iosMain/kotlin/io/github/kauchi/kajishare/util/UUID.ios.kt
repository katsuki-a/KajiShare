package io.github.kauchi.kajishare.util

import platform.Foundation.NSUUID

actual fun randomUUID(): String = NSUUID().UUIDString()
