package io.github.kauchi.kajishare.util

import java.util.UUID

actual fun randomUUID(): String = UUID.randomUUID().toString()
